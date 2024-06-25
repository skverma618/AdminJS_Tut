-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "isAdmin" BOOLEAN NOT NULL DEFAULT false,
    "isVerified" BOOLEAN NOT NULL DEFAULT true,
    "subscribed" BOOLEAN NOT NULL DEFAULT false,
    "subscriptionEnd" TIMESTAMP(3),
    "fromFunnel" BOOLEAN NOT NULL DEFAULT false,
    "password" TEXT NOT NULL,
    "uuid" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "stripeData" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "customer_id" TEXT,
    "subscription_id" TEXT,
    "plan_id" TEXT,
    "paymentStatus" TEXT,
    "credit_total" INTEGER NOT NULL DEFAULT 0,
    "credit_balance" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "stripeData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Suppliers" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "processing_time" INTEGER NOT NULL,
    "description" TEXT,
    "image" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Suppliers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MainCategory" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "icon" TEXT,

    CONSTRAINT "MainCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Subcategory" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "mainCategoryId" INTEGER NOT NULL,

    CONSTRAINT "Subcategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Group" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "Group_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Collection" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "image" TEXT[],
    "group_id" INTEGER NOT NULL,

    CONSTRAINT "Collection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Products" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT[],
    "link" TEXT NOT NULL,
    "us_shipping_time" INTEGER,
    "ww_shipping_time" INTEGER,
    "listing_cost" DOUBLE PRECISION NOT NULL,
    "sale_price" DOUBLE PRECISION NOT NULL,
    "sales_angle" TEXT,
    "desc_heading" TEXT,
    "description" TEXT,
    "benefits" TEXT,
    "ad_copy" TEXT,
    "mainCategoryId" INTEGER NOT NULL,
    "subcategory_id" INTEGER NOT NULL,
    "supplier_id" INTEGER,
    "collection_id" INTEGER,
    "processing_time" INTEGER DEFAULT 0,
    "us_shipping_cost" DOUBLE PRECISION DEFAULT 0,
    "return_policy" TEXT,
    "ww_shipping_cost" DOUBLE PRECISION DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CopyCreator" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "copy_type" TEXT,
    "product_name" TEXT,
    "product_description" TEXT,
    "brand_description" TEXT,
    "target_audience" TEXT,
    "price_and_discount" TEXT,
    "product_category" TEXT,
    "product_features" TEXT,
    "product_usage" TEXT,
    "product_benefits" TEXT,
    "framework" TEXT,
    "copy" JSONB,
    "timestamps" TEXT[],
    "user_id" INTEGER NOT NULL,
    "isStreamEnded" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "CopyCreator_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "stripeData_user_id_key" ON "stripeData"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Suppliers_name_key" ON "Suppliers"("name");

-- CreateIndex
CREATE UNIQUE INDEX "MainCategory_name_key" ON "MainCategory"("name");
