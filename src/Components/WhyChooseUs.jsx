const WhyChooseUs = () => {
    const features = [
        {
            icon: "ti-lock",
            title: "Private & secure",
            description: "Every booking is tied to your account. Your space is yours alone for the duration.",
            color: "bg-purple-100 text-purple-600"
        },
        {
            icon: "ti-clock",
            title: "Flexible hours",
            description: "Book by the hour — whether you need 30 minutes or a full day, you only pay for what you use.",
            color: "bg-blue-100 text-blue-600"
        },
        {
            icon: "ti-wifi",
            title: "Premium amenities",
            description: "High-speed Wi-Fi, whiteboards, projectors, and power outlets — everything you need to focus.",
            color: "bg-emerald-100 text-emerald-600"
        },
        {
            icon: "ti-calendar-cancel",
            title: "Easy cancellations",
            description: "Plans change. Cancel any upcoming booking from your dashboard with just one click.",
            color: "bg-rose-100 text-rose-600"
        },
        {
            icon: "ti-building",
            title: "List your own room",
            description: "Have a space to share? List it on Study-Nook and start earning from unused rooms.",
            color: "bg-amber-100 text-amber-600"
        },
        {
            icon: "ti-shield-check",
            title: "Conflict-free booking",
            description: "Our system prevents double bookings automatically — your time slot is always guaranteed.",
            color: "bg-teal-100 text-teal-600"
        }
    ];

    return (
        <section className="py-20 px-4 bg-gray-50">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-14">
                    <span className="text-xs font-bold uppercase tracking-widest text-blue-500">Why Study-Nook</span>
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-2">
                        Everything you need to study better
                    </h2>
                    <p className="text-gray-500 mt-3 text-base max-w-xl mx-auto">
                        We built Study-Nook for students and professionals who take their focus seriously.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {features.map((feature, idx) => (
                        <div key={idx} className="bg-white rounded-3xl p-6 border border-gray-100 flex gap-4 items-start hover:shadow-md transition-shadow duration-200">
                            <div className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 ${feature.color}`}>
                                <i className={`ti ${feature.icon} text-lg`}></i>
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-900 text-base">{feature.title}</h3>
                                <p className="text-gray-500 text-sm mt-1 leading-relaxed">{feature.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhyChooseUs;