"use client";

import type { Product } from "lib/shopify/types";

import React from "react";
import Link from "next/link";
import { GridTileImage } from "components/grid/tile";
import { GiPumpkin, GiIronMask, GiSpiderWeb } from "react-icons/gi";
import { FaHatWizard, FaGift, FaGem } from "react-icons/fa";
import { MdOutlineNightlight } from "react-icons/md";

interface CategorySectionProps {
	title: string;
	bgColor: string;
	products: Product[];
}

const iconMap: Record<
	string,
	React.ComponentType<{ size?: string | number }>
> = {
	Costumes: FaHatWizard,
	Decorations: GiSpiderWeb,
	Gadgets: FaGift,
	Jewelry: FaGem,
	Masks: GiIronMask,
	Halloween2025: MdOutlineNightlight,
};

export default function CategorySection({
	title,
	bgColor,
	products,
}: CategorySectionProps) {
	const Icon = iconMap[title] || GiPumpkin;

	return (
		<section className={`${bgColor} py-10`}>
			<div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
				<div className='flex justify-between items-center mb-8'>
					<div className='flex items-center gap-3 text-3xl font-extrabold tracking-tight text-orange-400 drop-shadow-lg'>
						<Icon size={40} />
						<span>{title}</span>
					</div>
					<Link
						href={`/search?collection=${title.toLowerCase()}`}
						className='text-yellow-400 hover:text-yellow-300 transition-colors font-semibold'>
						Browse more &rarr;
					</Link>
				</div>

				{products.length === 0 && (
					<p className='text-center text-yellow-300 mt-6 font-medium'>
						No products found in this collection.
					</p>
				)}

				<div className='grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5'>
					{products.map((product) => (
						<Link
							key={product.handle}
							href={`/product/${product.handle}`}
							className='group relative aspect-square overflow-hidden bg-black rounded-sm shadow-md transition-transform hover:scale-105 hover:shadow-xl'>
							<GridTileImage
								alt={product.title}
								label={{
									title: product.title,
									amount: product.priceRange.maxVariantPrice.amount,
									currencyCode: product.priceRange.maxVariantPrice.currencyCode,
								}}
								src={product.featuredImage?.url}
								fill
								sizes='(min-width: 1024px) 20vw, (min-width: 768px) 25vw, 50vw'
							/>
						</Link>
					))}
				</div>
			</div>
		</section>
	);
}
