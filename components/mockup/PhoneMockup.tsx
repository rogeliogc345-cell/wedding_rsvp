// components/PhoneMockup.tsx
export default function PhoneMockup({ url }: { url: string }) {
    return (
        <div className="relative mx-auto border-gray-900 dark:border-gray-800 bg-gray-900 border-[14px] rounded-[2.5rem] h-[700px] w-[340px] shadow-2xl">
            {/* Elementos físicos del teléfono */}
            <div className="h-[32px] w-[3px] bg-gray-800 absolute -start-[17px] top-[72px] rounded-s-lg"></div>
            <div className="h-[46px] w-[3px] bg-gray-800 absolute -start-[17px] top-[124px] rounded-s-lg"></div>
            <div className="h-[46px] w-[3px] bg-gray-800 absolute -start-[17px] top-[178px] rounded-s-lg"></div>
            <div className="h-[64px] w-[3px] bg-gray-800 absolute -end-[17px] top-[142px] rounded-e-lg"></div>

            {/* Pantalla con Iframe */}
            <div className="rounded-[2rem] overflow-hidden w-full h-full bg-white antialiased">
                <iframe
                    src={url}
                    className="w-full h-full border-none"
                    title="Vista previa de invitación"
                    loading="lazy"
                />
            </div>
        </div>
    );
}