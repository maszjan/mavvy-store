import { CartProvider } from "components/cart/cart-context";
import { Navbar } from "components/layout/navbar";
import { GeistSans } from "geist/font/sans";
import { getCart } from "lib/shopify";
import { ReactNode } from "react";
import { Toaster } from "sonner";
import { GoogleAnalytics } from "nextjs-google-analytics";
import "./globals.css";
import { baseUrl } from "lib/utils";

const { SITE_NAME } = process.env;

export const metadata = {
	metadataBase: new URL(baseUrl),
	title: {
		default: SITE_NAME!,
		template: `%s | ${SITE_NAME}`,
	},
	robots: {
		follow: true,
		index: true,
	},
};

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID!;

export default async function RootLayout({
	children,
}: {
	children: ReactNode;
}) {
	const cart = getCart();

	return (
		<html lang='en' className={GeistSans.variable}>
			<head />
			<body className='bg-neutral-50 text-black selection:bg-teal-300 dark:bg-neutral-900 dark:text-white dark:selection:bg-pink-500 dark:selection:text-white'>
				{/* Google Analytics */}
				<GoogleAnalytics gaMeasurementId={GA_MEASUREMENT_ID} />
				<CartProvider cartPromise={cart}>
					<Navbar />
					<main>
						{children}
						<Toaster closeButton />
					</main>
				</CartProvider>
			</body>
		</html>
	);
}
