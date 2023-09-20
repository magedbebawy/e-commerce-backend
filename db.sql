CREATE TABLE customers (
	customer_id SERIAL PRIMARY KEY,
	email VARCHAR(255) NOT NULL UNIQUE,
	full_name VARCHAR(255) NOT NULL,
	password VARCHAR(255) NOT NULL,
	is_active BOOLEAN DEFAULT TRUE,
	created_on DATE NOT NULL,
	created_by VARCHAR(255) NOT NULL,
	updated_on DATE DEFAULT NULL,
	updated_by VARCHAR(255) DEFAULT NULL,
	user_type VARCHAR(100) DEFAULT 'user'
);

CREATE TABLE addresses (
	address_id SERIAL PRIMARY KEY,
	stree VARCHAR(255) NOT NULL,
	apt VARCHAR(10) DEFAULT NULL,
	city VARCHAR(255) NOT NULL,
	state VARCHAR(255) NOT NULL,
	country VARCHAR(255) NOT NULL,
	zip VARCHAR(10) NOT NULL,
	created_on DATE NOT NULL,
	created_by VARCHAR(255) NOT NULL,
	updated_on DATE,
	updated_by VARCHAR(255)
);

CREATE TABLE orders (
	order_id SERIAL PRIMARY KEY,
	customer_id INT REFERENCES customers(customer_id),
	address_id INT REFERENCES addresses(address_id),
	tracking_number VARCHAR(255) DEFAULT NULL,
	is_shipped BOOLEAN DEFAULT FALSE,
	is_delivered BOOLEAN DEFAULT FALSE,
	order_date DATE NOT NULL,
	order_update_date DATE DEFAULT NULL,
	updated_by VARCHAR(255),
	shipped_on DATE DEFAULT NULL,
	delivered_on DATE DEFAULT NULL,
	total DECIMAL(10,2)
);

CREATE TABLE customers_addresses (
	customer_id INT REFERENCES customers(customer_id),
	address_id INT REFERENCES addresses(address_id),
	PRIMARY KEY (customer_id, address_id)
);

CREATE TABLE products (
	product_id SERIAL PRIMARY KEY,
	name VARCHAR(255) NOT NULL,
	description VARCHAR(500) NOT NULL,
	category VARCHAR(50) NOT NULL,
	price DECIMAL(10,2) NOT NULL,
	quantity INT,
	is_active BOOLEAN DEFAULT TRUE
);

CREATE TABLE orders_products (
	order_product_id SERIAL PRIMARY KEY,
	product_id INT REFERENCES products(product_id),
	order_id INT REFERENCES orders(order_id),
	quantity INT,
	price DECIMAL(10,2)
);

CREATE TABLE product_images (
	image_id SERIAL PRIMARY KEY,
	product_id INT REFERENCES products(product_id),
	data BYTEA
);

CREATE TABLE profile_images (
	imaged_id SERIAL PRIMARY KEY,
	customer_id INT REFERENCES customers(customer_id) UNIQUE,
	data BYTEA
);

-- DROP TABLE product_images;
-- DROP TABLE orders_products;
-- DROP TABLE products;







