// app/page.tsx
import { Suspense } from "react";
import { getProducts, getCollections } from "lib/shopify";
import Footer from "components/layout/footer";
import HeroBanner from "components/hero-banner";
import CategoryNav from "components/category-nav";
import ProductGrid from "components/product-grid";
import FeaturedSection from "components/featured-section";

export const metadata = {
	description:
		"Discover amazing seasonal and novelty products at Mavvy Store. Quality items for every occasion.",
	openGraph: {
		type: "website",
		title: "Mavvy Store - Seasonal & Novelty Products",
		description:
			"Discover amazing seasonal and novelty products at Mavvy Store.",
	},
};

// Loading Components
function ProductGridSkeleton() {
	return (
		<div className='grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4'>
			{Array.from({ length: 8 }).map((_, i) => (
				<div
					key={i}
					className='aspect-square animate-pulse rounded-lg bg-neutral-200 dark:bg-neutral-700'
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
					className='h-10 w-24 animate-pulse rounded-full bg-neutral-200 dark:bg-neutral-700'
				/>
			))}
		</div>
	);
}

export default async function HomePage({
	searchParams,
}: {
	searchParams?: { [key: string]: string | string[] | undefined };
}) {
	// Get search and filter parameters
	const searchValue =
		typeof searchParams?.q === "string" ? searchParams.q : undefined;
	const collection =
		typeof searchParams?.collection === "string"
			? searchParams.collection
			: undefined;

	return (
		<>
			{/* Full Width Hero Banner */}
			<HeroBanner />

			{/* Categories Section */}
			<section className='bg-white py-12 dark:bg-black'>
				<div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
					<div className='text-center mb-8'>
						<h2 className='text-3xl font-bold text-gray-900 dark:text-white'>
							Shop by Category
						</h2>
						<p className='mt-2 text-lg text-gray-600 dark:text-gray-300'>
							Find exactly what you're looking for
						</p>
					</div>

					<Suspense fallback={<CategoryNavSkeleton />}>
						<CategoryNav />
					</Suspense>
				</div>
			</section>

			{/* Featured Section */}
			<section className='bg-gray-50 py-12 dark:bg-neutral-900'>
				<div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
					<FeaturedSection />
				</div>
			</section>

			{/* Products Grid Section */}
			<section className='bg-white py-16 dark:bg-black'>
				<div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
					<div className='mb-8'>
						<h2 className='text-3xl font-bold text-gray-900 dark:text-white'>
							{searchValue
								? `Search results for "${searchValue}"`
								: collection
									? `${collection} Products`
									: "Featured Products"}
						</h2>
						<p className='mt-2 text-lg text-gray-600 dark:text-gray-300'>
							Discover our curated selection of quality products
						</p>
					</div>

					<Suspense fallback={<ProductGridSkeleton />}>
						<ProductGrid searchValue={searchValue} collection={collection} />
					</Suspense>
				</div>
			</section>

			<Footer />
		</>
	);
}
