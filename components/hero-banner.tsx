"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

type Banner = {
	id: number;
	title: string;
	subtitle: string;
	cta: string;
	link: string;
	bgColor: string;
	image?: string;
};

const banners: Banner[] = [
	{
		id: 1,
		title: "Halloween Collection",
		subtitle: "Spooky clothes and costumes for the perfect night",
		cta: "Shop Costumes",
		link: "/search?collection=costumes",
		bgColor: "from-orange-600 to-red-600",
		image: "/baner-1.png",
	},
	{
		id: 2,
		title: "Creepy Decorations",
		subtitle: "Jack-o'-lanterns, garlands and eerie lights for your home",
		cta: "Shop Decorations",
		link: "/search?collection=decorations",
		bgColor: "from-yellow-600 to-orange-700",
		image: "/baner-2.png",
	},
	{
		id: 3,
		title: "Masks & Costumes",
		subtitle: "Authentic masks, props and family costumes",
		cta: "Shop Masks",
		link: "/search?collection=masks",
		bgColor: "from-blue-700 to-purple-800",
		image: "/baner-3.png",
	},
];

export default function HeroBanner() {
	const [currentBanner, setCurrentBanner] = useState(0);

	useEffect(() => {
		const timer = setInterval(() => {
			setCurrentBanner((prev) => (prev + 1) % banners.length);
		}, 5000);
		return () => clearInterval(timer);
	}, []);

	const banner = banners[currentBanner]!;

	return (
		<section className='relative h-[70vh] min-h-[500px] w-full overflow-hidden'>
			{/* Background gradient + optional image */}
			<div
				className={`absolute inset-0 bg-gradient-to-r ${banner.bgColor}`}
				aria-hidden>
				{banner.image && (
					<div className='absolute inset-0 opacity-80'>
						<Image
							src={banner.image}
							alt={banner.title}
							fill
							sizes='100vw'
							priority
							className='object-cover'
						/>
					</div>
				)}
			</div>

			{/* Content */}
			<div className='relative z-10 flex h-full items-center'>
				<div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
					<div className='max-w-3xl'>
						<h1 className='text-4xl font-bold text-white sm:text-5xl lg:text-6xl'>
							{banner.title}
						</h1>
						<p className='mt-6 text-xl font-semibold text-white/90 sm:text-2xl'>
							{banner.subtitle}
						</p>

						<div className='mt-8 flex flex-col gap-4 sm:flex-row'>
							<Link
								href={banner.link}
								className='rounded-full bg-white px-8 py-4 text-lg font-semibold text-gray-900 transition-all hover:scale-105 hover:bg-gray-100'>
								{banner.cta}
							</Link>
							<Link
								href='/search'
								className='rounded-full border-2 border-white px-8 py-4 text-lg font-semibold text-white transition-all hover:bg-white hover:text-gray-900'>
								Browse All
							</Link>
						</div>
					</div>
				</div>
			</div>

			{/* Indicators */}
			<div className='absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 space-x-2'>
				{banners.map((_, index) => (
					<button
						key={index}
						type='button'
						aria-label={`Show slide ${index + 1}`}
						onClick={() => setCurrentBanner(index)}
						className={`h-3 w-3 rounded-full transition-all ${
							index === currentBanner
								? "bg-white"
								: "bg-white/50 hover:bg-white/75"
						}`}
					/>
				))}
			</div>

			{/* Navigation Arrows */}
			<button
				type='button'
				aria-label='Previous slide'
				onClick={() =>
					setCurrentBanner(
						(prev) => (prev - 1 + banners.length) % banners.length,
					)
				}
				className='absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/20 p-2 text-white transition-all hover:bg-black/40'>
				<svg
					className='h-6 w-6'
					fill='none'
					stroke='currentColor'
					viewBox='0 0 24 24'>
					<path
						strokeLinecap='round'
						strokeLinejoin='round'
						strokeWidth={2}
						d='M15 19l-7-7 7-7'
					/>
				</svg>
			</button>

			<button
				type='button'
				aria-label='Next slide'
				onClick={() => setCurrentBanner((prev) => (prev + 1) % banners.length)}
				className='absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/20 p-2 text-white transition-all hover:bg-black/40'>
				<svg
					className='h-6 w-6'
					fill='none'
					stroke='currentColor'
					viewBox='0 0 24 24'>
					<path
						strokeLinecap='round'
						strokeLinejoin='round'
						strokeWidth={2}
						d='M9 5l7 7-7 7'
					/>
				</svg>
			</button>
		</section>
	);
}
