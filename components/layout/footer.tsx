// components/layout/footer/index.tsx
import Link from "next/link";
import Image from "next/image";
import FooterMenu from "components/layout/footer-menu";
import { getMenu } from "lib/shopify";
import { Suspense } from "react";

const { COMPANY_NAME, SITE_NAME } = process.env;

export default async function Footer() {
	const currentYear = new Date().getFullYear();
	const skeleton =
		"w-full h-6 animate-pulse rounded-sm bg-neutral-200 dark:bg-neutral-700";
	const menu = await getMenu("next-js-frontend-footer-menu");
	const copyrightName = COMPANY_NAME || SITE_NAME || "Mavvy Store";

	return (
		<footer className='text-sm text-neutral-500 dark:text-neutral-400'>
			<div className='mx-auto flex w-full max-w-7xl flex-col gap-6 border-t border-neutral-200 px-6 py-12 text-sm md:flex-row md:gap-12 md:px-4 min-[1320px]:px-0 dark:border-neutral-700'>
				{/* Logo and Brand Section */}
				<div className='flex flex-col gap-4'>
					<Link
						className='flex items-center gap-2 text-black dark:text-white'
						href='/'>
						<div className='relative h-8 w-8 overflow-hidden rounded-md'>
							<Image
								src='/logo.png'
								alt={`${SITE_NAME} logo`}
								fill
								className='object-contain'
								priority
							/>
						</div>
						<span className='uppercase font-medium'>{SITE_NAME}</span>
					</Link>
					<p className='max-w-xs text-neutral-600 dark:text-neutral-300'>
						Discover amazing seasonal and novelty products for every occasion.
					</p>
				</div>

				{/* Footer Menu from Shopify */}
				<Suspense
					fallback={
						<div className='flex h-[188px] w-[200px] flex-col gap-2'>
							<div className={skeleton} />
							<div className={skeleton} />
							<div className={skeleton} />
							<div className={skeleton} />
							<div className={skeleton} />
							<div className={skeleton} />
						</div>
					}>
					<FooterMenu menu={menu} />
				</Suspense>

				{/* Categories Section */}
				<div className='flex flex-col gap-2'>
					<h3 className='font-medium text-black dark:text-white'>Categories</h3>
					<Link
						href='/search?collection=seasonal'
						className='hover:text-black dark:hover:text-white'>
						Seasonal Items
					</Link>
					<Link
						href='/search?collection=novelty'
						className='hover:text-black dark:hover:text-white'>
						Novelty Products
					</Link>
					<Link
						href='/search?collection=halloween'
						className='hover:text-black dark:hover:text-white'>
						Halloween
					</Link>
					<Link
						href='/search?collection=christmas'
						className='hover:text-black dark:hover:text-white'>
						Christmas
					</Link>
					<Link
						href='/search?collection=gifts'
						className='hover:text-black dark:hover:text-white'>
						Gifts
					</Link>
				</div>

				{/* Customer Service Section */}
				<div className='flex flex-col gap-2'>
					<h3 className='font-medium text-black dark:text-white'>
						Customer Service
					</h3>
					<Link
						href='/contact'
						className='hover:text-black dark:hover:text-white'>
						Contact Us
					</Link>
					<Link
						href='/shipping'
						className='hover:text-black dark:hover:text-white'>
						Shipping Info
					</Link>
					<Link
						href='/returns'
						className='hover:text-black dark:hover:text-white'>
						Returns & Exchanges
					</Link>
					<Link href='/faq' className='hover:text-black dark:hover:text-white'>
						FAQ
					</Link>
				</div>

				{/* Legal Section */}
				<div className='flex flex-col gap-2'>
					<h3 className='font-medium text-black dark:text-white'>Legal</h3>
					<Link
						href='/privacy-policy'
						className='hover:text-black dark:hover:text-white'>
						Privacy Policy
					</Link>
					<Link
						href='/terms-of-service'
						className='hover:text-black dark:hover:text-white'>
						Terms of Service
					</Link>
					<Link
						href='/refund-policy'
						className='hover:text-black dark:hover:text-white'>
						Refund Policy
					</Link>
					<Link
						href='/cookies'
						className='hover:text-black dark:hover:text-white'>
						Cookie Policy
					</Link>
				</div>
			</div>

			{/* Copyright Section */}
			<div className='border-t border-neutral-200 py-6 text-sm dark:border-neutral-700'>
				<div className='mx-auto flex w-full max-w-7xl flex-col items-center gap-4 px-4 md:flex-row md:justify-between md:gap-0 md:px-4 min-[1320px]:px-0'>
					<p>
						&copy; {currentYear} {copyrightName}. All rights reserved.
					</p>

					{/* Social Links */}
					<div className='flex items-center gap-4'>
						<span className='text-neutral-300 dark:text-neutral-600'>|</span>
						<Link
							href='mailto:support@mavvy.store'
							className='hover:text-black dark:hover:text-white'>
							support@mavvy.store
						</Link>
					</div>
				</div>
			</div>
		</footer>
	);
}
