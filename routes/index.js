var router = require('express').Router(),
		loadSlider = require('../lib/middleware/loadSlider'),
		loadLast = require('../lib/middleware/loadLast'),
		loadMostViewed = require('../lib/middleware/loadMostViewed'),
		home = require('../controllers/home'),
		product = require('../controllers/products'),
		user = require('../controllers/users'),
		cart = require('../controllers/cart'),
		checkAuth = require('../lib/middleware/checkAuth'),
		loadUser = require('../lib/middleware/loadUser');

router.use(loadUser);
router.use(require('../lib/middleware/loadBasket'));

router.get('/', loadSlider, loadLast, loadMostViewed, home.index);
router.get('/switch/:currency', home.switchCurrency);
router.get('/products/:category', product.category);
router.get('/new/:category', product.new);
router.get('/sale', product.sale);

router.route('/contact')
		.get(home.contactForm)
		.post(home.submitMessage);

router.route('/subscribe')
		.get(user.subscription)
		.post(user.subscribe);		

router.route('/register')
		.get(user.regForm)
		.post(user.register);

router.get('/register/secure', user.securePassword);		
router.get('/register/verify/:token', user.confirmation);	

router.route('/login')
		.get(user.login)
		.post(user.authenticate);
router.get('/logout', user.logout);			

router.post('/restore_password', user.restore);		
router.post('/update_password', user.updatePassword);

router.route('/cancel_account')
		.get(checkAuth, user.cancelAccount)
		.delete(user.removeAccount);

router.route('/wishlist/:code?')
		.get(checkAuth, product.wishlist)
		.post(checkAuth, product.addToWishlist)
		.delete(product.removeFromWishlist);		

router.get('/cart', checkAuth, cart.show);		
router.get('/cart/checkout', checkAuth, cart.checkout);
router.post('/cart/check_discount', cart.checkDiscount);		
router.post('/cart/send_order', cart.sendOrder);
router.post('/cart/update', cart.update);

router.get('/order_history', checkAuth, user.orders);		

router.get('/delivery', home.delivery);				
router.get('/returns', home.returns);				
router.get('/terms', home.terms);				
router.get('/privacy', home.privacy);				
router.get('/about', home.about);		

router.get('/FAQ', home.faq);		

router.get('/back', home.back);

router.get('/search', home.search);

module.exports = router;