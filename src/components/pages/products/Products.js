import React from 'react';
import PropTypes from 'prop-types'

import globalStyles from '../../../assets/scss/index.module.scss';
import styles from './Products.module.scss';
import { ALL_CATEGORIES } from '../../../constants/constants';

import Product from '../../product/Product';
import Categories from '../../categories/Categories';

class Products extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: '',
      displayFull: true,
      products: props.products
    }

    this.handleFilter = this.handleFilter.bind(this);
    this.filterProducts = this.filterProducts.bind(this);
    this.handleDisplayType = this.handleDisplayType.bind(this);
  }

  componentDidMount() {
    const { fetchProducts } = this.props;
    fetchProducts();
  }

  filterProducts() {
    const { products } = this.props;
    const { searchValue } = this.state;

    const productsFiltered = products.filter(product => product.name && product.name.toLowerCase().indexOf(searchValue.toLowerCase()) >= 0 ) || products;
    this.setState({
      products: productsFiltered 
    })
  }

  handleDisplayType(displayFull) {
    this.setState({ displayFull });
  }

  handleFilter(e) {
    const { searchValue } = e.target.value;

    this.setState({
      searchValue
    }, this.filterProducts())
  }

  renderCard = ({id, name, description, price, brand, photo}) => (
    <div key={id}>
      <div>{name}</div>
      <div>{description}</div>
      <div>{price}</div>
      <div>{brand}</div>
      <img src={photo} />
    </div>
  )

  render() {
    const { isFetching, products, match } = this.props;
    const { params } = match;
    const { searchValue } = this.state;
    let productList = null;
  
    const categoriesArrays = products.map(product => product.categories).join(',').split(",");
    const categories = categoriesArrays.filter((item, index) => categoriesArrays.indexOf(item) === index)
    const activeCategory = params.category || ALL_CATEGORIES;
    const category = `${activeCategory.charAt(0).toUpperCase()}${activeCategory.slice(1)}`
    const productsByCategory = activeCategory === ALL_CATEGORIES ? products : products.filter(product => product.categories.includes(category));

    if(isFetching) {
      productList = <div>Loading</div>
    }

    if(products.length) {
      
      console.log(category, productsByCategory, 'por categorias');
      productList = (
        productsByCategory.map(product => <Product key={product.id} {...product}/>)
      )
    }

    return (
      <section>
        <aside>
          <Categories categories={[ALL_CATEGORIES, ...categories]} active={activeCategory} />
          <div>
            categorias aqui
          </div>
        </aside>
        <main className={styles.Products__mainSection}>
        <header>
          <div className={styles.Products__toolbar}>
            <div>
              <i
                onClick={() => this.handleDisplayType(true)}
                className={`${globalStyles['md-icon']}`}
              />
              <i
                onClick={() => this.handleDisplayType(false)}
                className={`${globalStyles['md-icon']}`}
              />
            </div>
            <div className={styles.Product__input__search}>
              <input value={searchValue} onChange={this.handleFilter}/>
            </div>
          </div>
          <div>
            <p>
              Showing <strong>{productsByCategory.length}</strong> products - hidden <strong>{products.length - productsByCategory.length}</strong>
            </p>
          </div>
        </header>
          <section className={styles.Product__list}>
            {productList}
          </section>
      </main>
    </section>
    )
  }
}

Products.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  products: PropTypes.array.isRequired,
  success: PropTypes.bool.isRequired
}

export default Products;
