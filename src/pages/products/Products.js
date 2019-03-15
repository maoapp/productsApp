// @vendors
import React from 'react';
import PropTypes from 'prop-types';
import { CircularProgress } from 'react-md';

// @constants
import { 
	ALL_CATEGORIES, 
	EMPTY_STATE_CATEGORIES,
	ERROR_404,
	INPUT_PLACEHOLDER_SEARCH,
	PAGINATION_NUMBER,
	TIMEOUT_SCROLL
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
			products: props.products,
			items: PAGINATION_NUMBER
		};

		this.buildCategories = this.buildCategories.bind(this);
		this.buildProducts = this.buildProducts.bind(this);
		this.getScrollBottom = this.getScrollBottom.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleDisplayType = this.handleDisplayType.bind(this);
		this.handleScroll = this.handleScroll.bind(this);
		this.renderContent = this.renderContent.bind(this);
		this.resetScroll = this.resetScroll.bind(this);
	}

	componentDidMount() {
		const { fetchProducts } = this.props;
		window.addEventListener('scroll', this.handleScroll);

		fetchProducts();
	}
    
	componentWillReceiveProps(nextProps) {
		const { match } = this.props;
		const { params } = match;
		const previewCategory = params.category || ALL_CATEGORIES;
		const { match: currentMatch } = nextProps;
		const { params: currentParams } = currentMatch;
		const currentCategory = currentParams.category || ALL_CATEGORIES;

		if (previewCategory !== currentCategory) {
			this.resetScroll();
		}
	}
    
	handleChange(event) {
		this.setState({searchValue: event.target.value});
	}

	handleDisplayType(displayList) {
		this.setState({ displayList });
	}

	buildCategories() {
		const { products } = this.props;
		const categoriesArrays = products.map(product => product.categories).join(',').split(',');
        
		return categoriesArrays.filter(
			(item, index) => categoriesArrays.indexOf(item) === index
		).sort().reverse();	
	}
    
	handleScroll () {
		const { products } = this.props;
		const { items } = this.state;
		const isBottomOfScroll = this.getScrollBottom() && products.length > items;
        
		if(isBottomOfScroll) {
			setTimeout(() => this.setState(prevstate => ({ items: prevstate.items + PAGINATION_NUMBER})), TIMEOUT_SCROLL); 
		}
	}
    
	buildProducts(activeCategory) {
		const { products } = this.props;
		const category = firstLetterUpperCase(activeCategory);

		return activeCategory === ALL_CATEGORIES ? products : products.filter(product => product.categories.includes(category));
	}
    
	getScrollBottom() {
		return (window.innerHeight + window.scrollY >= document.body.offsetHeight);
	}
    
	resetScroll() {
		window.scrollTo(0,0); 
		this.setState({items: 10});
	}
    
	renderContent(activeCategory, categories, items, productsToShow, productList) {
		const { displayList, searchValue } = this.state;
		const { products } = this.props;
		const totalProducts = products.length - productsToShow.length;
		const showProductsSection = activeCategory === ALL_CATEGORIES || categories.includes(firstLetterUpperCase(activeCategory));
		const messageEmptyStateCategories = EMPTY_STATE_CATEGORIES.replace('{category}', activeCategory);

		return(
			<React.Fragment>
				{showProductsSection ? <section>
					<aside className={styles['products__categorySection']}>
						<Categories active={activeCategory} categories={[firstLetterUpperCase(ALL_CATEGORIES), ...categories]} />
					</aside>
					<main className={styles['products__mainSection']}>
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
										className={`${displayList && styles['products__viewControls--iconInactive']} material-icons`}
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
								<span>Showing <strong>{productsToShow.length} </strong></span> 
								{
									products.length !== productsToShow.length && 
                                    <span> 
                                        products - Hidden <strong>{totalProducts}</strong>
                                    </span>
								}
							</div>
						</header>
						<section className="md-grid">
							{productList.slice(0, items)}
						</section>
						{this.getScrollBottom() && productsToShow.length > items && productsToShow.length > 10 && <div>
							<CircularProgress style={{fill: 'red'}}id="circularProgressScroll" scale={1} />
						</div>}
					</main> 
				</section> : <EmptyState customMessage={messageEmptyStateCategories} state={ERROR_404}/>}
			</React.Fragment>
		);
	}

	render() {
		const { isFetching, match, products } = this.props;
		const { params } = match || '';
		const { displayList, items, searchValue } = this.state; 
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
					searchValue.toLowerCase()) !== -1) || productsToShow;
			}

			productList = (
				productsToShow.map(product => <ProductCard displayList={displayList} key={product.id} {...product} />)
			);
      
			content = this.renderContent(activeCategory, categories, items, productsToShow, productList);
		} else {
			content = isFetching ? <div className={styles['products--stateLoading']}>
				<CircularProgress id="circularProgress" scale={5} />
			</div> : <Error/>;
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
