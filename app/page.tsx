import Footer from "components/layout/footer";
import HeroBanner from "components/hero-banner";
import HalloweenPromo from "components/halloween-promo";
import CategorySection from "components/category-section";
import { getCollectionProducts } from "lib/shopify";

export default async function HomePage() {
	const costumes = await getCollectionProducts({
		collection: "costumes",
		reverse: true,
		sortKey: "CREATED_AT",
	});
	const clothes = await getCollectionProducts({
		collection: "clothes",
		reverse: true,
		sortKey: "CREATED_AT",
	});
	const decorations = await getCollectionProducts({
		collection: "decorations",
		reverse: true,
		sortKey: "CREATED_AT",
	});
	const gadgets = await getCollectionProducts({
		collection: "gadgets",
		reverse: true,
		sortKey: "CREATED_AT",
	});
	const jewelry = await getCollectionProducts({
		collection: "jewelry",
		reverse: true,
		sortKey: "CREATED_AT",
	});
	const masks = await getCollectionProducts({
		collection: "masks",
		reverse: true,
		sortKey: "CREATED_AT",
	});
	const halloween = await getCollectionProducts({
		collection: "halloween",
		reverse: true,
		sortKey: "CREATED_AT",
	});

	return (
		<>
			<HalloweenPromo />
			<HeroBanner />
			<CategorySection
				title='Costumes'
				bgColor='bg-black'
				products={costumes}
			/>
			<CategorySection
				title='Clothes'
				bgColor='bg-neutral-900'
				products={clothes}
			/>
			<CategorySection
				title='Decorations'
				bgColor='bg-neutral-900'
				products={decorations}
			/>
			<CategorySection title='Gadgets' bgColor='bg-black' products={gadgets} />
			<CategorySection
				title='Jewelry'
				bgColor='bg-neutral-900'
				products={jewelry}
			/>
			<CategorySection title='Masks' bgColor='bg-black' products={masks} />
			<CategorySection
				title='Halloween'
				bgColor='bg-gradient-to-br from-black via-neutral-800 to-gray-900'
				products={halloween}
			/>
			<Footer />
		</>
	);
}
