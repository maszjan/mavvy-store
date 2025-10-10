import { getCollections } from "lib/shopify";
import Link from "next/link";
import { Suspense } from "react";
import { FaShoppingBag, FaUser, FaGem, FaGift } from "react-icons/fa";
import { GiPumpkin, GiPumpkinMask } from "react-icons/gi";

const predefinedCategories = [
	{ handle: "all", title: "All Products", icon: FaShoppingBag },
	{ handle: "costumes", title: "Costumes", icon: FaUser },
	{ handle: "jewelry", title: "Jewelry", icon: FaGem },
	{ handle: "gadgets", title: "Gadgets", icon: FaGift },
	{ handle: "decorations", title: "Decorations", icon: GiPumpkin },
	{ handle: "masks", title: "Masks", icon: GiPumpkinMask }, // new mask category
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
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
				<div
					className='
                    grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6
                    lg:flex lg:flex-row lg:gap-8 lg:justify-center lg:items-center lg:w-full lg:space-x-6 lg:space-y-0
                '>
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
								className='group flex flex-col items-center justify-center rounded-xl bg-white p-6 shadow-sm transition-transform hover:scale-105 hover:shadow-md dark:bg-neutral-800'
								aria-label={category.title}>
								<IconComponent
									className='mb-3 text-gray-700 dark:text-gray-300 group-hover:text-orange-500'
									size={40}
									aria-hidden='true'
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
		// fallback: same layout without API categories
		return (
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
				<div
					className='
                    grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6
                    lg:flex lg:flex-row lg:gap-8 lg:justify-center lg:items-center lg:w-full lg:space-x-6 lg:space-y-0
                '>
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
								className='group flex flex-col items-center justify-center rounded-xl bg-white p-6 shadow-sm transition-transform hover:scale-105 hover:shadow-md dark:bg-neutral-800'
								aria-label={category.title}>
								<IconComponent
									className='mb-3 text-gray-700 dark:text-gray-300 group-hover:text-orange-500'
									size={40}
									aria-hidden='true'
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
