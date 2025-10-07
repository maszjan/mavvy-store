// components/hero-banner.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

const banners = [
	{
		id: 1,
		title: "Halloween Collection 2025",
		subtitle: "Spooky decorations and costumes for the perfect Halloween",
		cta: "Shop Halloween",
		link: "/search?collection=halloween",
		bgColor: "from-orange-600 to-red-600",
		image: "/banners/halloween.jpg", // Add your banner images
	},
	{
		id: 2,
		title: "Holiday Gifts",
		subtitle: "Unique and thoughtful gifts for every occasion",
		cta: "Shop Gifts",
		link: "/search?collection=gifts",
		bgColor: "from-green-600 to-blue-600",
		image: "/banners/gifts.jpg",
	},
	{
		id: 3,
		title: "Seasonal Favorites",
		subtitle: "Trending products for every season",
		cta: "Shop Now",
		link: "/search?collection=seasonal",
		bgColor: "from-purple-600 to-pink-600",
		image: "/banners/seasonal.jpg",
	},
];

export default function HeroBanner() {
	const [currentBanner, setCurrentBanner] = useState(0);

	useEffect(() => {
		const timer = setInterval(() => {
			setCurrentBanner((prev) => (prev + 1) % banners.length);
		}, 5000); // Change banner every 5 seconds

		return () => clearInterval(timer);
	}, []);

	const banner = banners[currentBanner];

	return (
		<section className='relative h-[70vh] min-h-[500px] w-full overflow-hidden'>
			{/* Background */}
			<div className={`absolute inset-0 bg-gradient-to-r ${banner.bgColor}`}>
				{/* Optional: Background image */}
				{banner.image && (
					<div className='absolute inset-0 opacity-30'>
						<Image
							src={banner.image}
							alt={banner.title}
							fill
							className='object-cover'
							priority
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
						<p className='mt-6 text-xl text-white/90 sm:text-2xl'>
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

			{/* Banner Indicators */}
			<div className='absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 space-x-2'>
				{banners.map((_, index) => (
					<button
						key={index}
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
