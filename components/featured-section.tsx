// components/featured-section.tsx
import Link from "next/link";

export default function FeaturedSection() {
	return (
		<div className='grid grid-cols-1 gap-8 lg:grid-cols-2'>
			{/* Featured Collection 1 */}
			<div className='relative overflow-hidden rounded-2xl bg-gradient-to-br from-orange-500 to-red-600 p-8 text-white'>
				<h3 className='text-2xl font-bold mb-2'>Halloween Special</h3>
				<p className='text-white/90 mb-4'>
					Get ready for spooky season with our exclusive Halloween collection
				</p>
				<Link
					href='/search?collection=halloween'
					className='inline-block rounded-full bg-white px-6 py-2 text-sm font-semibold text-gray-900 transition-all hover:scale-105'>
					Shop Halloween →
				</Link>
			</div>

			{/* Featured Collection 2 */}
			<div className='relative overflow-hidden rounded-2xl bg-gradient-to-br from-green-500 to-blue-600 p-8 text-white'>
				<h3 className='text-2xl font-bold mb-2'>Gift Ideas</h3>
				<p className='text-white/90 mb-4'>
					Find the perfect gift for any occasion with our curated selection
				</p>
				<Link
					href='/search?collection=gifts'
					className='inline-block rounded-full bg-white px-6 py-2 text-sm font-semibold text-gray-900 transition-all hover:scale-105'>
					Browse Gifts →
				</Link>
			</div>
		</div>
	);
}
