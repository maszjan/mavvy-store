import { Suspense } from "react";
import Footer from "components/layout/footer";
import HeroBanner from "components/hero-banner";
import CategoryNav from "components/category-nav";
import ProductGrid from "components/product-grid";

export const metadata = {
	description:
		"Discover spooky and exclusive Halloween 2025 products at Mavvy Store. Perfect for the season.",
	openGraph: {
		type: "website",
		title: "Mavvy Store - Halloween 2025 Specials",
		description:
			"Discover exclusive seasonal Halloween 2025 products at Mavvy Store.",
	},
};

function ProductGridSkeleton() {
	return (
		<div className='grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4'>
			{Array.from({ length: 8 }).map((_, i) => (
				<div
					key={i}
					className='aspect-square animate-pulse rounded-lg bg-orange-200 dark:bg-orange-800'
				/>
			))}
		</div>
	);
}

function CategoryNavSkeleton() {
	return (
		<div className='flex gap-4 overflow-x-auto pb-4'>
			{Array.from({ length: 6 }).map((_, i) => (
				<div
					key={i}
					className='h-10 w-24 animate-pulse rounded-full bg-orange-200 dark:bg-orange-800'
				/>
			))}
		</div>
	);
}

export default async function HomePage({
	searchParams,
}: {
	searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
	const params = searchParams ? await searchParams : {};

	const searchValue = typeof params.q === "string" ? params.q : undefined;

	const collection =
		typeof params.collection === "string" ? params.collection : "all";

	return (
		<>
			<HeroBanner />

			<section className='bg-orange-50 dark:bg-orange-900 py-12'>
				<div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
					<div className='text-center mb-8'>
						<h2 className='text-4xl font-bold text-orange-800 dark:text-orange-300'>
							🎃 Halloween 2025 Special Collection 🎃
						</h2>
						<p className='mt-2 text-lg text-orange-700 dark:text-orange-400'>
							Get ready for a spooky season with our handpicked Halloween
							products!
						</p>
					</div>

					<Suspense fallback={<CategoryNavSkeleton />}>
						<CategoryNav />
					</Suspense>
				</div>
			</section>

			<section className='bg-white dark:bg-black py-16'>
				<div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
					<Suspense fallback={<ProductGridSkeleton />}>
						<ProductGrid searchValue={searchValue} collection={collection} />
					</Suspense>
				</div>
			</section>

			<Footer />
		</>
	);
}
