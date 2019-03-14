// @vendors
import React from 'react';
import PropTypes from 'prop-types';
import { CircularProgress } from 'react-md';

// @constants
import { 
	ALL_CATEGORIES, 
	INPUT_PLACEHOLDER_SEARCH,
	EMPTY_STATE_CATEGORIES,
	ERROR_404
} from '../../constants/constants';

// @utils
import { firstLetterUpperCase } from '../../utils/formatStrings';

// @components
import Categories from '../../components/categories/Categories';
import Error from '../../components/error/Error';
import EmptyState from '../../components/emptyState/EmptyState';
import ProductCard from '../../components/productCard/ProductCard';

// @styles
import styles from './Products.module.scss';

class Products extends React.Component {
	constructor(props) {
		super(props);
        
		this.state = {
			searchValue: '',
			displayList: true,
			products: props.products
		};

		this.buildCategories = this.buildCategories.bind(this);
		this.buildProducts = this.buildProducts.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleDisplayType = this.handleDisplayType.bind(this);
		this.renderContent = this.renderContent.bind(this);
	}

	componentDidMount() {
		const { fetchProducts } = this.props;
        
		fetchProducts();
	}

	handleDisplayType(displayList) {
		this.setState({ displayList });
	}

	handleChange(event) {
		this.setState({searchValue: event.target.value});
	}
  
	buildCategories() {
		const { products } = this.props;
		const categoriesArrays = products.map(product => product.categories).join(',').split(',');
        
		return categoriesArrays.filter(
			(item, index) => categoriesArrays.indexOf(item) === index
		).sort().reverse();	
	}
  
	buildProducts(activeCategory) {
		const { products } = this.props;
		const category = firstLetterUpperCase(activeCategory);

		return activeCategory === ALL_CATEGORIES ? products : products.filter(product => product.categories.includes(category));
	}
  
	renderContent(activeCategory, categories, productsToShow, productList) {
		const { displayList, searchValue } = this.state;
		const { products } = this.props;
		const totalProducts = products.length - productsToShow.length;
		const showProductsSection = activeCategory === ALL_CATEGORIES || categories.includes(firstLetterUpperCase(activeCategory));
		const messageEmptyStateCategories = EMPTY_STATE_CATEGORIES.replace('{category}', activeCategory);

		return(
			<section>
				<aside className={styles['products__categorySection']}>
					<Categories active={activeCategory} categories={[firstLetterUpperCase(ALL_CATEGORIES), ...categories]} />
				</aside>
				{showProductsSection ? <main className={styles['products__mainSection']}>
					<header>
						<div className={styles['products__toolbar']}>
							<div className={styles['products__viewControls']}>
								<i
									onClick={() => this.handleDisplayType(true)}
									className={`${!displayList && styles['products__viewControls--iconInactive']} material-icons`}
								>
                                    view_list
								</i>
								<i
									onClick={() => this.handleDisplayType(false)}
									className={`${displayList && styles['products__viewControls__iconInactive']} material-icons`}
								>
                                    view_module
								</i>
							</div>
							<div className={styles['products__searchInputContainer']}>
								<input 
									type="text" 
									value={searchValue} 
									onChange={this.handleChange} 
									className={styles['products__searchInput']}
									placeholder={INPUT_PLACEHOLDER_SEARCH}
								/>
							</div>
						</div>
						<div>
							<p>
                                Showing <strong>{productsToShow.length}</strong> products - hidden <strong>{totalProducts}</strong>
							</p>
						</div>
					</header>
					<section className="md-grid">
						{productList}
					</section>
				</main> : <EmptyState customMessage={messageEmptyStateCategories} state={ERROR_404}/>}
			</section>
		);
	}

	render() {
		const { isFetching, match, products } = this.props;
		const { params } = match || '';
		const { displayList, searchValue } = this.state; 
		let activeCategory;
		let categories;
		let content;
		let productList;
		let productsToShow;

		if(products.length) {
			categories = this.buildCategories();
			activeCategory = params && params.category || ALL_CATEGORIES;
			productsToShow = this.buildProducts(activeCategory);
      
			if(searchValue) {
				productsToShow = productsToShow.filter(product => product.name.toLowerCase().indexOf(
					searchValue.toLowerCase()) !== -1);
			}

			productList = (
				productsToShow.map(product => <ProductCard displayList={displayList} key={product.id} {...product} />)
			);
      
			content = this.renderContent(activeCategory, categories, productsToShow, productList);
		} else {
			content = isFetching ? <CircularProgress id="circularProgress" scale={2} /> : <Error/>;
		}

		return content;
	}
}

Products.propTypes = {
	error: PropTypes.bool.isRequired,
	fetchProducts: PropTypes.func.isRequired,
	isFetching: PropTypes.bool.isRequired,
	products: PropTypes.array.isRequired,
	success: PropTypes.bool.isRequired
};

export default Products;
