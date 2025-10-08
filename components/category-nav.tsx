import { getCollections } from "lib/shopify";
import Link from "next/link";
import { Suspense } from "react";
import { FaShoppingBag, FaUser, FaGem, FaGift, FaGhost } from "react-icons/fa";
import { GiPumpkin } from "react-icons/gi";

const predefinedCategories = [
	{ handle: "all", title: "All Products", icon: FaShoppingBag },
	{ handle: "costumes", title: "Costumes", icon: FaUser },
	{ handle: "jewelry", title: "Jewelry", icon: FaGem },
	{ handle: "gadgets", title: "Gadgets", icon: FaGift },
	{ handle: "decorations", title: "Decorations", icon: GiPumpkin },
];

async function CategoryList() {
	try {
		const collections = await getCollections();

		const allCategories = predefinedCategories.map((predef) => {
			const shopifyCollection = collections.find(
				(c) => c.handle === predef.handle,
			);
			return shopifyCollection
				? { ...shopifyCollection, icon: predef.icon }
				: predef;
		});

		return (
			<div className='flex justify-center'>
				<div className='flex flex-wrap justify-center gap-6 max-w-7xl w-full'>
					{allCategories.map((category) => {
						const IconComponent = category.icon;
						return (
							<Link
								key={category.handle}
								href={
									category.handle === "all"
										? "/"
										: `/search?collection=${category.handle}`
								}
								className='group relative flex flex-col items-center justify-center rounded-xl bg-white p-6 shadow-sm transition-transform hover:scale-105 hover:shadow-md dark:bg-neutral-800 w-40 sm:w-44 lg:w-52'>
								{/* small seasonal badge */}
								<span className='absolute -top-2 -right-2 rounded-full bg-orange-500 text-white text-xs px-2 py-1 opacity-90 transform rotate-6'>
									🎃
								</span>

								<IconComponent
									className='mb-3 text-gray-700 dark:text-gray-300 group-hover:text-orange-500'
									size={40}
								/>
								<span className='text-sm font-medium text-gray-900 dark:text-white text-center'>
									{category.title}
								</span>
							</Link>
						);
					})}
				</div>
			</div>
		);
	} catch (error) {
		// Fallback simplified fallback with same centering
		return (
			<div className='flex justify-center'>
				<div className='flex flex-wrap justify-center gap-6 max-w-7xl w-full'>
					{predefinedCategories.map((category) => {
						const IconComponent = category.icon;
						return (
							<Link
								key={category.handle}
								href={
									category.handle === "all"
										? "/"
										: `/search?collection=${category.handle}`
								}
								className='group relative flex flex-col items-center justify-center rounded-xl bg-white p-6 shadow-sm transition-transform hover:scale-105 hover:shadow-md dark:bg-neutral-800 w-40 sm:w-44 lg:w-52'>
								<span className='absolute -top-2 -right-2 rounded-full bg-orange-500 text-white text-xs px-2 py-1 opacity-90 transform rotate-6'>
									🎃
								</span>

								<IconComponent
									className='mb-3 text-gray-700 dark:text-gray-300 group-hover:text-orange-500'
									size={40}
								/>
								<span className='text-sm font-medium text-gray-900 dark:text-white text-center'>
									{category.title}
								</span>
							</Link>
						);
					})}
				</div>
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
