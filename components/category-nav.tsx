// components/category-nav.tsx
import { getCollections } from "lib/shopify";
import Link from "next/link";
import { Suspense } from "react";

const predefinedCategories = [
	{ handle: "all", title: "All Products", icon: "🛍️" },
	{ handle: "seasonal", title: "Seasonal", icon: "🍂" },
	{ handle: "halloween", title: "Halloween", icon: "🎃" },
	{ handle: "christmas", title: "Christmas", icon: "🎄" },
	{ handle: "novelty", title: "Novelty", icon: "🎁" },
	{ handle: "gifts", title: "Gifts", icon: "💝" },
];

async function CategoryList() {
	try {
		const collections = await getCollections();

		// Merge predefined with Shopify collections
		const allCategories = predefinedCategories.map((predef) => {
			const shopifyCollection = collections.find(
				(c) => c.handle === predef.handle,
			);
			return shopifyCollection
				? { ...shopifyCollection, icon: predef.icon }
				: predef;
		});

		return (
			<div className='grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6'>
				{allCategories.map((category) => (
					<Link
						key={category.handle}
						href={
							category.handle === "all"
								? "/"
								: `/search?collection=${category.handle}`
						}
						className='group flex flex-col items-center rounded-xl bg-white p-6 shadow-sm transition-all hover:scale-105 hover:shadow-md dark:bg-neutral-800'>
						<div className='text-4xl mb-3 group-hover:scale-110 transition-transform'>
							{category.icon}
						</div>
						<span className='text-sm font-medium text-gray-900 dark:text-white'>
							{category.title}
						</span>
					</Link>
				))}
			</div>
		);
	} catch (error) {
		return (
			<div className='grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6'>
				{predefinedCategories.map((category) => (
					<Link
						key={category.handle}
						href={
							category.handle === "all"
								? "/"
								: `/search?collection=${category.handle}`
						}
						className='group flex flex-col items-center rounded-xl bg-white p-6 shadow-sm transition-all hover:scale-105 hover:shadow-md dark:bg-neutral-800'>
						<div className='text-4xl mb-3 group-hover:scale-110 transition-transform'>
							{category.icon}
						</div>
						<span className='text-sm font-medium text-gray-900 dark:text-white'>
							{category.title}
						</span>
					</Link>
				))}
			</div>
		);
	}
}

export default function CategoryNav() {
	return (
		<Suspense fallback={<div>Loading categories...</div>}>
			<CategoryList />
		</Suspense>
	);
}
