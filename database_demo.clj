num "Orders_status_enum" {
  "pending"
  "processing"
  "shipped"
  "delivered"
  "cancelled"
}

Enum "Admins_role_enum" {
  "super_admin"
  "manager"
  "staff"
}

Enum "Payments_status_enum" {
  "pending"
  "success"
  "failed"
}

Table "Categories" {
  "category_id" INT [pk, increment]
  "name" VARCHAR(100) [unique, not null]
  "created_at" TIMESTAMP [default: `CURRENT_TIMESTAMP`]
  "updated_at" TIMESTAMP [default: `CURRENT_TIMESTAMP`]
}

Table "Brands" {
  "brand_id" INT [pk, increment]
  "name" VARCHAR(100) [unique, not null]
  "image_id" VARCHAR(255)
  "created_at" TIMESTAMP [default: `CURRENT_TIMESTAMP`]
  "updated_at" TIMESTAMP [default: `CURRENT_TIMESTAMP`]
}

Table "Product_Lines" {
  "line_id" INT [pk, increment]
  "name" VARCHAR(255) [not null]
  "code" VARCHAR(255) [unique, not null]
  "category_id" INT [not null]
  "brand_id" INT [not null]
  "created_at" TIMESTAMP [default: `CURRENT_TIMESTAMP`]
  "updated_at" TIMESTAMP [default: `CURRENT_TIMESTAMP`]
}

Table "Products" {
  "product_id" INT [pk, increment]
  "line_id" INT [not null]
  "name" VARCHAR(50) [unique, not null]
  "code" VARCHAR(50) [not null]
  "description" text
  "image_id" VARCHAR(20)
  "base_price" DECIMAL(15,2) [not null]
  "status" VARCHAR(20)
  "created_at" TIMESTAMP [default: `CURRENT_TIMESTAMP`]
  "updated_at" TIMESTAMP [default: `CURRENT_TIMESTAMP`]
}

Table "Variants" {
  "variant_id" INT [pk]
  "product_id" INT [not null]
  "color" VARCHAR(20) [not null]
  "status" VARCHAR(20)
}

Table "Inventories" {
  "inventory_id" INT [pk]
  "variant_id" INT [not null]
  "available_quantity" INT
  "sold_quantity" INT [default: 0]
}

Table "Attributes" {
  "attribute_id" INT [pk, increment]
  "product_id" INT [not null]
  "name" VARCHAR(255) [not null]
  "value" INT [not null]
  "group_id" INT [not null]
}

Table "images" {
  "image_id" INT [pk, increment]
  "base64" text
  "variant_id" int
  "is_primary" BOOLEAN [default: FALSE]
  "created_at" TIMESTAMP [default: `CURRENT_TIMESTAMP`]
}

Table "Users" {
  "user_id" INT [pk, increment]
  "full_name" VARCHAR(100) [not null]
  "email" VARCHAR(100) [unique]
  "password" VARCHAR(255)
  "is_active" BOOL [not null, default: true]
  "role_id" INT [not null]
  "created_at" TIMESTAMP [default: `CURRENT_TIMESTAMP`]
  "updated_at" TIMESTAMP [default: `CURRENT_TIMESTAMP`]
}

Table "Cart_Items" {
  "cart_item_id" INT [pk, increment]
  "customer_id" INT [not null]
  "product_id" INT [not null]
  "quantity" INT [not null]
}

Table "Orders" {
  "order_id" INT [pk, increment]
  "customer_id" INT [not null]
  "shipping_info_id" INT [not null]
  "total_amount" DECIMAL(15,2) [not null]
  "status" VARCHAR(20) [not null]
  "payment_method" VARCHAR(50)
  "created_at" TIMESTAMP [default: `CURRENT_TIMESTAMP`]
  "updated_at" TIMESTAMP [default: `CURRENT_TIMESTAMP`]
}

Table "Items_Promotions" {
  "item_id" INT [not null]
  "promotion_id" INT [not null]
  "value" INT [not null]

  Indexes {
    (item_id, promotion_id) [pk]
  }
}

Table "Order_Items" {
  "order_item_id" INT [pk, increment]
  "order_id" INT [not null]
  "product_id" INT [not null]
  "quantity" INT [not null]
  "price" DECIMAL(15,2) [not null]
}

Table "Reviews" {
  "review_id" INT [pk, increment]
  "product_id" INT [not null]
  "customer_id" INT [not null]
  "order_item_id" INT [not null]
  "rating" INT
  "content" TEXT
  "created_at" TIMESTAMP [default: `CURRENT_TIMESTAMP`]
  "updated_at" TIMESTAMP [default: `CURRENT_TIMESTAMP`]
}

Table "Promotions" {
  "promotion_id" INT [pk, increment]
  "name" VARCHAR(100) [not null]
  "value" DECIMAL(5,2)
  "start_date" DATETIME [not null]
  "end_date" DATETIME [not null]
  "created_at" TIMESTAMP [default: `CURRENT_TIMESTAMP`]
  "updated_at" TIMESTAMP [default: `CURRENT_TIMESTAMP`]
}

Table "Product_Promotions" {
  "product_id" INT [not null]
  "promotion_id" INT [not null]

  Indexes {
    (product_id, promotion_id) [pk]
  }
}

Table "Admin_Logs" {
  "log_id" INT [pk, increment]
  "admin_id" INT [not null]
  "action" VARCHAR(100) [not null]
  "entity_type" VARCHAR(50)
  "entity_id" INT
  "details" JSON
  "created_at" TIMESTAMP [default: `CURRENT_TIMESTAMP`]
}

Table "Payments" {
  "payment_id" INT [pk, increment]
  "order_id" INT [not null]
  "amount" DECIMAL(15,2) [not null]
  "payment_method" VARCHAR(50) [not null]
  "transaction_id" VARCHAR(100)
  "status" Payments_status_enum [default: 'pending']
  "created_at" TIMESTAMP [default: `CURRENT_TIMESTAMP`]
  "updated_at" TIMESTAMP [default: `CURRENT_TIMESTAMP`]
}

Table "Shipping_Infos" {
  "shipping_info_id" INT [pk, increment]
  "customer_id" INT [not null]
  "phone" VARCHAR(20) [not null]
  "address" VARCHAR(100) [not null]
  "receive_name" VARCHAR(100) [not null]
}

Ref:"Products"."product_id" < "Attributes"."product_id" [delete: cascade]

Ref:"Users"."user_id" < "Cart_Items"."customer_id" [delete: cascade]

Ref:"Products"."product_id" < "Cart_Items"."product_id" [delete: restrict]

Ref:"Users"."user_id" < "Orders"."customer_id" [delete: restrict]

Ref:"Users"."user_id" < "Shipping_Infos"."customer_id" [delete: restrict]

Ref:"Orders"."order_id" < "Order_Items"."order_id" [delete: cascade]

Ref:"Products"."product_id" < "Order_Items"."product_id" [delete: restrict]

Ref:"Products"."product_id" < "Reviews"."product_id" [delete: cascade]

Ref:"Products"."product_id" < "Variants"."product_id" [delete: cascade]

Ref:"Variants"."variant_id" < "Inventories"."variant_id" [delete: cascade]

Ref:"Users"."user_id" < "Reviews"."customer_id" [delete: restrict]

Ref:"Products"."product_id" < "Product_Promotions"."product_id" [delete: cascade]

Ref:"Promotions"."promotion_id" < "Product_Promotions"."promotion_id" [delete: cascade]

Ref:"Promotions"."promotion_id" < "Items_Promotions"."promotion_id" [delete: cascade]

Ref:"Users"."user_id" < "Admin_Logs"."admin_id" [delete: restrict]

Ref:"Order_Items"."order_item_id" < "Items_Promotions"."item_id" [delete: cascade]

Ref:"Orders"."order_id" < "Payments"."order_id" [delete: cascade]

Ref:"Order_Items"."order_item_id" < "Reviews"."order_item_id" [delete: set null]

Ref:"Shipping_Infos"."shipping_info_id" < "Orders"."shipping_info_id" [delete: set null]