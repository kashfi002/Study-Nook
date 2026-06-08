const HowItWorks = () => {
    const steps = [
        {
            icon: "ti-search",
            title: "Browse rooms",
            description: "Explore available study rooms filtered by capacity, amenities, and hourly rate.",
            step: "01"
        },
        {
            icon: "ti-calendar",
            title: "Pick a time",
            description: "Choose your booking date, start time, and end time. See the total cost instantly.",
            step: "02"
        },
        {
            icon: "ti-check",
            title: "Confirm booking",
            description: "Reserve your spot in seconds. Get instant confirmation and manage bookings anytime.",
            step: "03"
        },
        {
            icon: "ti-book",
            title: "Start studying",
            description: "Show up, settle in, and make the most of your private, distraction-free study space.",
            step: "04"
        }
    ];

    return (
        <section className="py-20 px-4 bg-white">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-14">
                    <span className="text-xs font-bold uppercase tracking-widest text-blue-500">How it works</span>
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-2">
                        Book a room in 4 simple steps
                    </h2>
                    <p className="text-gray-500 mt-3 text-base max-w-xl mx-auto">
                        No complicated process — just find your room, pick your time, and get to work.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {steps.map((step, idx) => (
                        <div key={idx} className="relative bg-gray-50 rounded-3xl p-6 flex flex-col gap-4 border border-gray-100">
                            <span className="absolute top-5 right-5 text-5xl font-black text-gray-300 select-none leading-none">
                                {step.step}
                            </span>
                            <div className="w-12 h-12 rounded-2xl bg-[#2563EB] flex items-center justify-center shrink-0">
                                <i className={`ti ${step.icon} text-white text-xl`}></i>
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-900 text-lg">{step.title}</h3>
                                <p className="text-gray-500 text-sm mt-1 leading-relaxed">{step.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;