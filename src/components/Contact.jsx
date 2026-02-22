import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import ScrollReveal from './ScrollReveal';
import { contactInfo } from '../data/content';

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Thank you for your message! We will get back to you soon.');
        setFormData({ name: '', email: '', subject: '', message: '' });
    };

    const infoItems = [
        { icon: MapPin, label: 'Visit Us', value: contactInfo.address },
        { icon: Phone, label: 'Call Us', value: contactInfo.phone },
        { icon: Mail, label: 'Email Us', value: contactInfo.email },
    ];

    return (
        <section id="contact" className="py-20 md:py-28 bg-offwhite">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <ScrollReveal className="text-center mb-14">
                    <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-cream rounded-full">
                        <Mail className="w-4 h-4 text-golden" />
                        <span className="text-sm font-medium text-coffee uppercase tracking-wider">
                            Contact
                        </span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-charcoal">
                        Get in <span className="text-golden">Touch</span>
                    </h2>
                    <p className="mt-4 text-charcoal-light max-w-xl mx-auto">
                        Have a question, feedback, or a catering request? We'd love to hear from you.
                    </p>
                </ScrollReveal>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
                    {/* Left — Info + Map */}
                    <div>
                        <ScrollReveal>
                            <div className="space-y-5 mb-8">
                                {infoItems.map(({ icon: Icon, label, value }, i) => (
                                    <div
                                        key={i}
                                        className="flex items-start gap-4 p-4 bg-white rounded-xl border border-cream-dark/20 hover:shadow-md hover:border-golden/30 transition-all"
                                    >
                                        <div className="w-11 h-11 rounded-lg bg-golden/10 flex items-center justify-center shrink-0">
                                            <Icon className="w-5 h-5 text-golden" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold text-coffee">{label}</p>
                                            <p className="text-sm text-charcoal-light mt-0.5">{value}</p>
                                        </div>
                                    </div>
                                ))}

                                {/* Hours */}
                                <div className="flex items-start gap-4 p-4 bg-white rounded-xl border border-cream-dark/20">
                                    <div className="w-11 h-11 rounded-lg bg-golden/10 flex items-center justify-center shrink-0">
                                        <Clock className="w-5 h-5 text-golden" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-coffee">Opening Hours</p>
                                        {contactInfo.hours.map((h, i) => (
                                            <p key={i} className="text-sm text-charcoal-light mt-0.5">
                                                <span className="font-medium">{h.days}:</span> {h.time}
                                            </p>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </ScrollReveal>

                        {/* Map */}
                        <ScrollReveal delay={0.2}>
                            <div className="rounded-2xl overflow-hidden shadow-md border border-cream-dark/20 h-56 bg-cream">
                                <iframe
                                    src={contactInfo.mapEmbedUrl}
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen=""
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    title="Location Map"
                                />
                            </div>
                        </ScrollReveal>
                    </div>

                    {/* Right — Form */}
                    <ScrollReveal direction="right">
                        <form
                            onSubmit={handleSubmit}
                            className="bg-white rounded-2xl p-6 md:p-8 shadow-lg shadow-coffee/5 border border-cream-dark/20"
                        >
                            <h3 className="text-xl font-display font-bold text-charcoal mb-6">
                                Send a Message
                            </h3>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-charcoal mb-1.5">
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        placeholder="John Doe"
                                        className="w-full px-4 py-3 bg-offwhite border border-cream-dark/30 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-golden/40 focus:border-golden transition-all"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-charcoal mb-1.5">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        placeholder="john@example.com"
                                        className="w-full px-4 py-3 bg-offwhite border border-cream-dark/30 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-golden/40 focus:border-golden transition-all"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-charcoal mb-1.5">
                                        Subject
                                    </label>
                                    <input
                                        type="text"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        required
                                        placeholder="Catering inquiry"
                                        className="w-full px-4 py-3 bg-offwhite border border-cream-dark/30 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-golden/40 focus:border-golden transition-all"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-charcoal mb-1.5">
                                        Message
                                    </label>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        rows={4}
                                        placeholder="Tell us more..."
                                        className="w-full px-4 py-3 bg-offwhite border border-cream-dark/30 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-golden/40 focus:border-golden transition-all resize-none"
                                    />
                                </div>

                                <motion.button
                                    type="submit"
                                    whileTap={{ scale: 0.97 }}
                                    className="w-full flex items-center justify-center gap-2 py-3.5 bg-coffee text-cream font-semibold rounded-xl hover:bg-coffee-light transition-colors hover:shadow-lg hover:shadow-coffee/20"
                                >
                                    <Send className="w-4 h-4" />
                                    Send Message
                                </motion.button>
                            </div>
                        </form>
                    </ScrollReveal>
                </div>
            </div>
        </section>
    );
}
