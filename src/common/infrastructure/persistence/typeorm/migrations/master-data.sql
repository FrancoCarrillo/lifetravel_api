INSERT INTO money(id, name, change_value) VALUES
(1, 'soles', 3.24),
(2, 'dolares', 1);

INSERT INTO country(id, name, money_id) VALUES
(1, 'Peru', 1),
(2, 'Estados Unidos', 2);

INSERT INTO kind_city(id, name, description) VALUES
(1, 'Cultural', 'Ciudades perfectas para los amantes de la cultura e historia'),
(2, 'Playa', 'Ciudades perfectas para los amantes de la arena y el mar');

INSERT INTO city(id, name, country_id, kind_city_id) VALUES
(1, 'Cuzco', 1, 1),
(2, 'Miami', 2, 2);


