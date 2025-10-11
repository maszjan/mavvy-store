import { getProducts } from "lib/shopify";
import { GridTileImage } from "components/grid/tile";
import Link from "next/link";

interface ProductGridProps {
	searchValue?: string;
	collection?: string;
	limit?: number;
}

export default async function ProductGrid({
	searchValue,
	collection,
	limit = 12,
}: ProductGridProps) {
	try {
		// build params and cast to any so TS won't error if getProducts signature doesn't include `collection`
		const params: any = {
			query: searchValue,
			sortKey: "CREATED_AT",
			reverse: true,
		};
		if (collection) params.collection = collection;

		const products = await getProducts(params);

		const displayProducts = products.slice(0, limit);

		if (displayProducts.length === 0) {
			return (
				<div className='text-center py-12'>
					<h3 className='text-xl font-semibold text-gray-500 dark:text-gray-400 mb-2'>
						No products found
					</h3>
					<p className='text-gray-400 dark:text-gray-500'>
						{searchValue
							? "Try adjusting your search terms"
							: "Check back soon for new arrivals"}
					</p>
				</div>
			);
		}

		return (
			<div className='grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4'>
				{displayProducts.map((product) => (
					<Link
						key={product.handle}
						href={`/product/${product.handle}`}
						className='group relative aspect-square overflow-hidden rounded-lg bg-white shadow-sm transition-all hover:scale-[1.02] hover:shadow-lg dark:bg-neutral-800'>
						<GridTileImage
							alt={product.title}
							label={{
								title: product.title,
								amount: product.priceRange.maxVariantPrice.amount,
								currencyCode: product.priceRange.maxVariantPrice.currencyCode,
							}}
							src={product.featuredImage?.url}
							fill
							sizes='(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw'
						/>
					</Link>
				))}
			</div>
		);
	} catch (error) {
		return (
			<div className='text-center py-12'>
				<h3 className='text-xl font-semibold text-red-500 mb-2'>
					Failed to load products
				</h3>
				<p className='text-gray-500'>Please check your Shopify connection</p>
			</div>
		);
	}
}
