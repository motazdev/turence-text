export interface IUser {
  email: string;
  id: number;
  image: string;
  mobile: string;
  mobile_country_code: string;
  name: string;
  token: string;
  type: string;
  email_verified_at: boolean;
}
export interface ICartPageData {
  cart: ICart;
}
export interface IAddToCartResponse {
  orders: ICart;
  product: {
    id: number;
    price: string;
    price_before_discount: string;
    image_main: string;
    is_active: number;
    is_show_home_page: number;
    is_trend: number;
    not_checking_stock: number;
    min_order_qty: number;
    stock: number;
    minimum_stock_alert: number;
    created_at: string;
    updated_at: string;
  };
}
export interface IAttributesResponse {
  attributes: IProductAttribute[];
}

export interface IProductFavoritesResponse {
  product: IProductDetails;
}
export interface ILink {
  url?: string;
  label: string;
  active: boolean;
}
export interface IPaginatedReturnResponse<T> {
  data: IPaginatedData<T>;
  message: string;
  status: boolean;
  status_code: number;
}

export interface ISubcategory {
  main_category_details: ICategory;
  sub_categories: IPaginatedData<ICategory[]>;
}

export interface INotificationData {
  count: number;
  count_unread: number;
  notifications: IPaginatedData<INotification[]>;
}

export interface INotification {
  id: number;
  notification_type: string;
  param_id?: string;
  icon: string;
  title: string;
  message: string;
  diff_for_humans: string;
}

export interface IPaginatedData<T> {
  data: T;
  links: {
    first: string;
    last: string;
    prev?: boolean;
    next?: boolean;
  };
  meta: {
    current_page: number;
    from?: null;
    last_page: number;
    links: ILink[];
    path: string;
    per_page: number;
    to?: null;
    total: number;
  };
}

export interface IProductAttribute {
  display_format: string;
  id: number;
  name: string;
  stock?: string;
  values: { name?: string; hex?: string }[];
}
export interface IHomeDataServices {
  id: number;
  name: string;
  description: string;
  short_description: string;
  process_title: string;
  process_description: string;
  departmment: string;
  number_title: string;
  number: string;
  image: string;
  icon: string;
  process_image: string;
}

export interface IHomeDataSolution {
  title: string;
  sub_title: string;
  description: string;
  items: {
    id: number;
    title: string;
    description: string;
    image: string;
  }[];
}

export interface IHomeCommunications {
  communication_facebook: string;
  communication_twitter: string;
  communication_telegram: string;
  communication_instagram: string;
  communication_whatsapp: string;
  communication_linkedin: string;
}
export interface IHeroSlider {
  id: number;
  sale?: string;
  title: string;
  description: string;
}

export interface IHomeData {
  sliders: IHeroSlider[];
  products: IProduct[];
  categories: ICategory[];
  customer_feedback: ICustomerFeedback[];
  faqs: IAppQuestionsAnswer[];
  communications: IHomeCommunications;
}

export interface IPaginatedProductsResponse<T> {
  data: {
    attributes: IProductAttribute[];

    products: {
      data: T;

      links: {
        first: string;
        last: string;
        prev?: boolean;
        next?: boolean;
      };
      meta: {
        current_page: number;
        from?: null;
        last_page: number;
        links: ILink[];
        path: string;
        per_page: number;
        to?: null;
        total: number;
      };
    };
  };
  message: string;
  status: boolean;
  status_code: number;
}

export interface IReturnResponse<T> {
  status: boolean;
  status_code: number;
  data: T;
  message: string;
}

export interface IAboutUsData {
  faqs: IAppQuestionsAnswer[];
  customer_feedback: ICustomerFeedback[];
  clients_count: string;
  since_year: string;
  ratings: string;
  ratings_count: string;
  worldwide_product_sale_per_year: string;
  aboutus_description_page: string;
  image_1: string;
  image_2: string;
  image_3: string;
  image_4: string;
}

export interface ICityData {
  id: number;
  name: string;
  is_active: boolean;
  price: string;
}

export interface ICheckoutResponse {
  payment_url: string;
}
export interface ICheckoutGiftBody {
  is_gift: number; // Example control field to trigger the required_if validation
  friend_name: string; // Required if is_gift = 1 | Nullable | String | Max 255 characters
  friend_email?: string; // Optional | Must be a valid email | Max 255 characters
  friend_phone: string; // Required if is_gift = 1 | Nullable | String | Max 255 characters
  gift_message: string; // Optional | String | Max 5000 characters
  delivery_date: string; // Required if is_gift = 1 | Nullable | Date
  notes?: string; // Optional | String | Max 50000 characters
}
export interface ICheckoutUserDetailsBody {
  user_name: string; // Required - String - Max 255 characters
  user_email?: string; // Optional - Valid email format - Max 255 characters
  user_phone: string; // Required - String - Max 255 characters
  region_id: number; // Required - Integer - Must exist in regions table with is_active = 1 and city_id = provided city_id
  city_id: number; // Required - Integer - Must exist in cities table with is_active = 1
  title: string; // Required - String - Max 255 characters (place title)
  description: string; // Required - String - Max 255 characters (place description)
}
export interface ApiErrorResponse {
  message: string;
  status: boolean;
  status_code: number;
}

export interface ICity {
  id: number;
  name: string;
  is_active: false;
  price: number;
}

export interface IRegion {
  id: number;
  name: string;
  is_active: boolean;
  price: string;
}
export interface IAddress {
  id: number;
  city: ICity;
  region: IRegion;
  is_default: boolean;
  title: string;
  description: string;
  mobile_country_code: string;
  mobile: string;
}

export interface IOrder {
  id: number;
  order_num: string;
  items_count: number;
  status: string;
  payment_date: string;
  total: string;
}

export interface IRegisterForm {
  name: string;
  email: string;
  mobile: string;
  password: string;
  password_confirmation: string;
  mobile_country_code: string;
}

export interface ILoginForm {
  email: string;
  password: string;
}

export interface IForgetPasswordForm {
  email: string;
}

export interface IResetPasswordForm {
  email: string;
  otp: string;
  password: string;
  password_confirmation: string;
}

export interface IProductSpeficiations {
  categories_ids?: number[];
  attributres_product?: { id: number; value: string }[];
  max_rate?: number;
  min_rate?: number;
  just_featured?: string;
  is_favorite?: number;
  just_trend?: string;
}

export interface ICategory {
  id: number;
  name: string;
  image: string;
}

export interface IProduct {
  id: number;
  name: string;
  is_cart: boolean;
  is_favorite: boolean;
  description: string;
  categories: ICategory[];
  price: string;
  image: string;
  price_before_discount?: string;
  discount_percentage?: number;
  cart_item_id?: number;
  stock: number;
  rates: {
    count: number;
    avg?: number;
  };
  color_list: string[];
}

export interface ICartProductVarients {
  attr_id: string;
  value: string;
}
export interface ICartProductVarientsData {
  name: string;
  value: string;
}

export interface ICartProduct {
  id: number;
  image: string;
  name: string;
  variants: ICartProductVarients[];
  variants_data: ICartProductVarientsData[];
}

export interface ICartItem {
  id: number;
  product: ICartProduct;
  price: string;
  qty: number;
  total: string;
  is_available_in_stock: boolean;
}
export interface ITrackOrderResponse {
  status: string;
}
export interface IGenerateCartId {
  cart_id: string;
}
export interface ICart {
  id: number;
  order_num: string;
  address: {
    city?: ICity;
    region?: IRegion;
    address?: string;
    description?: string;
    title?: string;
    address_number?: number;
  };
  status: string;
  sub_total: number;
  shipping_value: number;
  discount_value: number;
  vat_value: number;
  total: number;
  coupon_code?: string;
  payment_date?: string;
  items_count: number;
  items: ICartItem[];
}

export interface IAddCartItem {
  product_id: number;
  qty: number;
  product_combination_id?: number;
}

export interface IUpdateCartItemQuantity {
  product_id: number;
  qty: number;
}

export interface IUpdateCartItemQuantityByProduct {
  product_id: number;
  product_combination_id: number;
  qty: number;
}

export interface IProductAttrCombinationAttribute {
  id: number;
  value: string;
}
export interface IProductAttrCombination {
  product_id: number;
  attributres_product: IProductAttrCombinationAttribute[];
}

export interface IProductDetails {
  categories: ICategory[];
  description: string;
  cart_item_id?: string;
  discount_percentage: number;
  is_cart: boolean;
  is_favorite: boolean;
  id: number;
  image: string;
  name: string;
  price: string;
  price_before_discount?: string;
  rates: { count: number; avg?: number };
  stock: 0;
}

export interface IProductFirstAttribute {
  id: number;
  price: string;
  stock: number;
  values: string[];
  discount_percentage: number;
  price_before_discount?: string;
}

export interface ISingleRate {
  comment: string;
  diff_for_humans: string;
  id: number;
  rate: string;
  user_name: string;
}

export interface IProductRate {
  avg: number;
  "1_star": number;
  "2_star": number;
  "3_star": number;
  "4_star": number;
  "5_star": number;
  can_review_product: boolean;
  current_user_review: null;
  total_rates: number;
  rates_with_percentage: number[];
  rates: IPaginatedData<ISingleRate[]>;
}

export interface IProductDetailsResponse {
  product_details: IProductDetails;
  photo_gallery: string[];
  order_item?: ICartItem;
  attributes: IProductAttribute[];
  first_attribute: IProductFirstAttribute;
  rates: IProductRate;
  similar_products: IProduct[];
}

export interface IWriteProductReviewBody {
  product_id: number;
  rate: number;
  comment: string;
}
export interface IAppSettings {
  general_description_ar: string;
  general_description_en: "";
  communication_email: string;
  communication_address: string;
  communication_mobile: string;
  communication_facebook: string;
  communication_linkedin: string;
  communication_twitter: string;
  communication_telegram: string;
  communication_instagram: string;
}

export interface IAppQuestionsAnswer {
  id: number;
  question: string;
  answer: string;
}

export interface ICustomerFeedback {
  id: number;
  name: string;
  rating: string;
  subtitle: string;
  description: string;
  image: string;
}

export interface IContactUsForm {
  name: string;
  email: string;
  mobile: string;
  message: string;
  mobile_country_code: string;
}

export interface IProductCombination {
  id: number;
  image?: string;
  order_item?: ICartItem;
  price: string;
  stock: number;
}

export interface IPolicy {
  text: string;
}

export interface IContactUsData {
  communication_email: string;
  communication_mobile: string;
  communication_address_ar: string;
  communication_address_en: string;
  communication_facebook: string;
  communication_twitter: string;
  communication_telegram: string;
  communication_instagram: string;
  communication_whatsapp: string;
  communication_linkedin: string;
}

export interface IFbAdManagerEvent<T> {
  event_name: string;
  event_time: number;

  event_id: string;
  event_source_url: string;
  action_source: string;
  user_data: {
    client_ip_address: string;
    client_user_agent: string;
    em: string[];
    ph: string[];
    fbc: string;
    fbp: string;
  };
  custom_data: T;
  opt_out?: boolean;
}

export interface IFbAdManagerBody<T> {
  data: IFbAdManagerEvent<T>[];
}

export interface IFbAdAddToCartData {
  item_id: number;
  content_ids: string[];
  content_type: string;
}

export interface IFBAdBodyAddToCart {
  firstName: string;
  email: string;
  country: string;
  productName: string;
  productId: string;
  price: string;
  quantity: string;
}
export interface IFBAdBodyCheckout {
  firstName: string;
  cartId: string;
  firstProductName: string;
  email: string;
  country: string;
  cartTotal: string;
  itemsCount: string;
}
export interface IFBAdBodyPurchase {
  firstName: string;
  orderId: string;
  orderNumber: string;
  email: string;
  country: string;
}
