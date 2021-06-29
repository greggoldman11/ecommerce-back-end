# DOM-inators
# E-Commerce Site (Donuts-R-Us)
This application allows the user to browse through and purchase products with their credit card by integrating the **Stripe** API.
### Technologies Used
- Javascript
- React.js
- HTML
- CSS/Sass
- React Bootstrap
- MongoDB
- Mongoose
- Express API
- Stripe
- Axios
### API Routes
| HTTP Method   | URL Path     | Action           | CRUD     |
|:--------------|:-------------|:-----------------|----------|
| GET           | /cart        | index or list    | `R`ead   |
| GET           | /cart/`:id`  | show or retrieve | `R`ead   |
| POST          | /cart        | create           | `C`reate |
| PATCH         | /cart/`:id`  | update           | `U`pdate |
| PATCH         | /cart-delete/`:id`  | removes product from cart         | `U`pdate |
| PATCH         | /orders/`:id`  | complete order           | `U`pdate |

# Deployed API Link
https://blooming-lowlands-35038.herokuapp.com/
# Deployed Client Link
# Planning
### ERD
![ERD](https://i.ibb.co/5s0ycQ5/89fd4780-d403-11eb-9523-44a0eb5aa08f.png)
### Process & Problem Solving
We broke into two pairs to tackle the front end and the back end separately for the first two days, then spent a lot of time as a group programming database and Stripe API integrations and styling. We generally had one team member at the helm performing the coding while the rest of the team did research and made suggestions along the way. When we ran into problems, we tested a lot of different permutations to make our code run, but eventually filled out issues for problems that left us stuck.
### Unsolved Problems For Future Iterations
- Improve mobile responsiveness
- Improve checkout process
(8 kB)
