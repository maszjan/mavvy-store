import { CartProvider } from "components/cart/cart-context";
import { Navbar } from "components/layout/navbar";
import { GeistSans } from "geist/font/sans";
import { getCart } from "lib/shopify";
import { ReactNode } from "react";
import { Toaster } from "sonner";
import Script from "next/script";
import "./globals.css";
import { baseUrl } from "lib/utils";
import { Analytics } from "@vercel/analytics/next";

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

export default async function RootLayout({
	children,
}: {
	children: ReactNode;
}) {
	const cart = getCart();

	const bannerImageUrl = `${baseUrl}/web.png`;
	const siteDescription = "With code HALLOWEEN2025 get 30% off sitewide!";

	return (
		<html lang='en' className={GeistSans.variable}>
			<head>
				<title>{SITE_NAME}</title>
				<meta property='og:title' content={SITE_NAME} />
				<meta property='og:description' content={siteDescription} />
				<meta property='og:image' content={bannerImageUrl} />
				<meta property='og:url' content={baseUrl} />
				<meta property='og:type' content='website' />

				<meta name='twitter:card' content='summary_large_image' />
				<meta name='twitter:title' content={SITE_NAME} />
				<meta name='twitter:description' content={siteDescription} />
				<meta name='twitter:image' content={bannerImageUrl} />

				{/* Facebook Meta Pixel */}
				<Script id='fb-pixel' strategy='afterInteractive'>
					{`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src='https://connect.facebook.net/en_US/fbevents.js';
            s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}
            (window, document,'script');
            fbq('init', '750552071338373');
            fbq('track', 'PageView');
          `}
				</Script>
			</head>
			<body className='bg-neutral-50 text-black selection:bg-teal-300 dark:bg-neutral-900 dark:text-white dark:selection:bg-pink-500 dark:selection:text-white'>
				{/* Facebook Meta Pixel noscript fallback */}
				<noscript>
					<img
						height='1'
						width='1'
						style={{ display: "none" }}
						src='https://www.facebook.com/tr?id=750552071338373&ev=PageView&noscript=1'
						alt=''
					/>
				</noscript>
				<CartProvider cartPromise={cart}>
					<Navbar />
					<main>
						{children}
						<Toaster closeButton />
					</main>
					<Analytics />
				</CartProvider>
			</body>
		</html>
	);
}
