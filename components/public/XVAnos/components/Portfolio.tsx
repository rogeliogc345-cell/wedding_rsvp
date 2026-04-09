import PhoneMockup from "@/components/mockup/PhoneMockup";

type PorfolioProps = {
    url: string;
    title: string;
    description: string;
}


export default function Portfolio({ url, title, description }: PorfolioProps) {
    return (
        <section className="bg-[#F9F8F6] py-20 px-4">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div>
                    <h2 className="text-4xl font-serif mb-6 text-gray-800">{title}</h2>
                    <p className="text-lg text-gray-600 mb-8">
                        {description}
                    </p>
                    <button className="bg-gray-800 text-white px-8 py-3 rounded-full hover:bg-gray-700 transition">
                        Cotizar Proyecto
                    </button>
                </div>
                <PhoneMockup url={url} />
            </div>
        </section>
    );
}