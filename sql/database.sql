CREATE TABLE account ( username VARCHAR(50) PRIMARY KEY, password TEXT, fullname VARCHAR(50), phone VARCHAR(11), birthday DATE, age INT );
CREATE TABLE category ( id INT PRIMARY KEY, name VARCHAR(20), description VARCHAR(50) );
CREATE TABLE subcategory ( id INT PRIMARY KEY, name VARCHAR(20), description VARCHAR(50), category_id INT, FOREIGN KEY (category_id) REFERENCES category (id) );
CREATE TABLE product ( id INT PRIMARY KEY, name VARCHAR(50), description TEXT, price REAL, image TEXT, brand VARCHAR(20), country VARCHAR(20) );
CREATE TABLE product_subcategory ( subcategory_id INT, product_id INT, FOREIGN KEY (product_id) REFERENCES product (id), FOREIGN KEY (subcategory_id) REFERENCES subcategory (id) );

INSERT INTO category VALUES ('1', 'category', '');
INSERT INTO category VALUES ('2', 'sex', '');
INSERT INTO category VALUES ('3', 'age', '');

INSERT INTO subcategory VALUES (1, 'action', '', 1);
INSERT INTO subcategory VALUES (2, 'puzzle', '', 1);
INSERT INTO subcategory VALUES (3, 'outdoor', '', 1);
INSERT INTO subcategory VALUES (4, 'vehicle', '', 1);
INSERT INTO subcategory VALUES (5, 'boy', '', 2);
INSERT INTO subcategory VALUES (6, 'girl', '', 2);
INSERT INTO subcategory VALUES (7, 'unisex', '', 2);
INSERT INTO subcategory VALUES (8, '0-year', '', 3);
INSERT INTO subcategory VALUES (9, '1-year', '', 3);
INSERT INTO subcategory VALUES (10, '3-year', '', 3);
INSERT INTO subcategory VALUES (11, '6-year', '', 3);

INSERT INTO product VALUES (1,
                            '16 Inch Moto X Bike',
                            'The Moto X 16" bike is the ideal choice for any young rider who wants that offroad scrambler look.
                             Each spoked wheel houses an inner tube and an offroad tyre, so adventures travelling to school or playing with friends is done in comfort,
                             plus Front & Rear brakes give confidence and excellent stopping power when whizzing around.
                             You will have complete peace of mind when it comes rider wellbeing,
                             as this model conforms to the ISO safety standards and is packed with safety features;
                             which include a fully enclosed chainguard (to stop little fingers getting to the chain),
                             Removable stabilisers, Front & Rear high visibility wheels reflectors plus a handlebar mounted bell.
                             The enclosed fairing and cool racing number are mounted to the robust Steel frame and adjustable handlebars.
                             This gives a perfect ride height for anyone who is 4- 6 years with a recommended inside leg 45- 55cm.
                             Helmet and protection set all sold separately.',
                            300000,
                            'https://image.smythstoys.com/original/desktop/181800.jpg',
                            '',
                            'China');

INSERT INTO product_subcategory VALUES (4, 1);
INSERT INTO product_subcategory VALUES (5, 1);
INSERT INTO product_subcategory VALUES (10, 1);