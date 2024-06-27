import dotenv from 'dotenv';
import AdminJS from 'adminjs'
import * as url from 'url'
import AdminJSExpress from '@adminjs/express'
import express from 'express'
import * as AdminJSPrisma from '@adminjs/prisma'
import { PrismaClient } from '@prisma/client'
import { getModelByName } from "@adminjs/prisma";
import cors from 'cors'
import session from "express-session";
import Connect from "connect-pg-simple";
import path from 'path';

const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

dotenv.config({
    path: path.resolve(__dirname, '../.env'),
});

const app = express();

const DEFAULT_ADMIN = {
    email: process.env.DEFAULT_EMAIL,
    password: process.env.DEFAULT_PASSWORD,
};

const authenticate = async (email: string, password: string) => {
    if (email === DEFAULT_ADMIN.email && password === DEFAULT_ADMIN.password) {
        return Promise.resolve(DEFAULT_ADMIN);
    }
    return null;
};

app.use(cors());


app.use(express.static("public"));
app.use((req, res, next) => {
    if (req.originalUrl === "/webhook") {
        next();
    } else {
        express.json()(req, res, next);
    }
});

app.use(
    session({
        secret: 'sushil',
        resave: false,
        saveUninitialized: true,
    })
);

app.use(express.static("public"));

// Constants
var PORT = 8001;

const prisma = new PrismaClient();

AdminJS.registerAdapter({
    Resource: AdminJSPrisma.Resource,
    Database: AdminJSPrisma.Database,
});

const start = async () => {
    const admin = new AdminJS({
        resources: [
            {
                resource: { model: getModelByName("User"), client: prisma },
                options: {},
            },
            {
                resource: { model: getModelByName("MainCategory"), client: prisma },
                options: {},
            },
            {
                resource: { model: getModelByName("HangoutPlaces"), client: prisma },
                options: {},
            },
            {
                resource: { model: getModelByName("Subcategory"), client: prisma },
                options: {},
            },
            {
                resource: { model: getModelByName("Group"), client: prisma },
                options: {},
            },
            {
                resource: { model: getModelByName("stripeData"), client: prisma },
                options: {},
            }
        ],
    });

    await admin.watch();

    const ConnectSession = Connect(session);
    const sessionStore = new ConnectSession({
        conObject: {
            connectionString: process.env.DATABASE_URL,
            ssl: process.env.NODE_ENV === "production",
        },
        tableName: "session",
        createTableIfMissing: true,
    });

    const adminRouter = AdminJSExpress.buildAuthenticatedRouter(
        admin,
        {
            authenticate,
            cookieName: process.env.ADMINJS_COOKIE_NAME,
            cookiePassword: process.env.ADMINJS_COOKIE_PASSWORD || "",
        },
        null,
        {
            store: sessionStore,
            resave: true,
            saveUninitialized: true,
            secret: process.env.ADMINJS_COOKIE_SECRET || "",
            cookie: {
                httpOnly: process.env.NODE_ENV === "production",
                secure: process.env.NODE_ENV === "production",
            },
            name: "adminjs",
        }
    );

    app.use(admin.options.rootPath, adminRouter);

    app.listen(PORT, () => {
        console.log(
            `AdminJS started on http://localhost:${PORT}${admin.options.rootPath}`
        );
    });
};

start();
