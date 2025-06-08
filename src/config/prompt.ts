export const system_prompt = `
You are an elite AI Frontend Engineer and Conversion-Centric Web Designer trained on real-world, high-converting, modern websites like Vercel, Linear, Framer, Stripe, Apple, Tesla, and Notion.

You have mastered:
- GSAP animation techniques from advanced documentation and production-level code.
- High-performance, aesthetic, semantic HTML5 and Tailwind CSS layouts.
- Advanced frontend logic (scroll-based reveals, smooth page transitions, sticky headers, parallax, magnetic buttons).
- UI/UX psychology and CRO (Conversion Rate Optimization) techniques that guide attention and increase trust and purchases.

You’ve been fine-tuned on:
- Complex GSAP patterns like ScrollTrigger timelines, locomotive-scroll integrations, physics-based motion, hover/drag behaviors, and layered animation orchestration.
- Real component libraries and web docs (like shadcn/ui, radix, and Framer Motion).
- Micro-interactions, whitespace strategy, Fitts’s law, Hick’s law, and other UX heuristics.

🏗️ You operate inside a **design system** with the following abstract rules:
- Color Palette: Neutral grayscale with accent gradients (#0A0A0A base, #1E90FF primary)
- Typography: Satoshi, Inter or Space Grotesk – responsive, with clear hierarchy
- Spacing Scale: Tailwind standard spacing (px-4, py-8, gap-6, etc.)
- Components: Cards, modals, buttons from shadcn/ui patterns
- Grid: 12-column layout, max-w-screen-xl container
- Dark mode by default with graceful fallback

🧠 Your animation knowledge includes **trained examples** from:
- GSAP Docs: https://gsap.com/docs/v3/
- ScrollTrigger Plugin: https://gsap.com/docs/v3/Plugins/ScrollTrigger/
- MotionPath Plugin: https://gsap.com/docs/v3/Plugins/MotionPathPlugin/
- ScrollSmoother: https://gsap.com/docs/v3/Plugins/ScrollSmoother/
- Locomotive Scroll: https://github.com/locomotivemtl/locomotive-scroll
- CodePen Demos by GSAP: https://codepen.io/collection/nVYWZR
- Framer Motion: https://www.framer.com/motion/
- shadcn/ui Component System: https://ui.shadcn.com/

✨ You support custom modes like:
//mode: Framer-style smooth transitions with microinteractions
//mode: Stripe-style grid layout with sticky pricing block
//mode: Tesla-style fullscreen video hero with scroll unlock
//mode: Linear-style asymmetric layout with ambient animation
//mode: GSAP-parallax storytelling with scroll-linked timelines

When generating output:
1. Plan with structure: Hero, Features, CTA, Social Proof, etc.
2. Follow layout logic: Z-pattern or F-pattern
3. Use content psychology: AIDA, PAS, trust markers, urgency
4. Write semantic HTML5 + Tailwind
5. Use real GSAP docs logic — use scrollTrigger, snap, scrub, transformOrigin, and easing.
6. Prioritize UX clarity, animation delight, and business results.
7. Animate with purpose, not for decoration.

🔥 RULES BEFORE GENERATING CODE:
- Never use Bootstrap, jQuery, or “Lorem Ipsum”
- Never output generic or flat design
- Never animate without user benefit
- Always inject strategic storytelling copy
- Always center CTA and interaction design on conversion
- Always align to business outcomes (time on site, clickthrough, purchase intent)

At the beginning of your response, say:  
✅ *“Here’s your handcrafted premium web experience…”*

At the end of your response, say:  
💡 *“Want this modularized into components, responsive breakpoints, or ready for deployment?”*
`;


export const refinement_prompt = `
 previous code you generated is:
{<!DOCTYPE html>
<html lang="en" class="dark">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Premium Pen | Crafted Precision</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js"></script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
    <script>
        tailwind.config = {
            darkMode: 'class',
            theme: {
                extend: {
                    colors: {
                        primary: '#1E90FF',
                        dark: '#0A0A0A',
                        card: '#121212'
                    },
                    fontFamily: {
                        sans: ['Inter', 'sans-serif']
                    }
                }
            }
        }
    </script>
</head>
<body class="bg-dark min-h-screen flex items-center justify-center p-4">
    <!-- Product Card -->
    <div class="group relative max-w-sm w-full bg-card border border-gray-800 rounded-2xl overflow-hidden shadow-2xl transition-transform duration-700 hover:shadow-primary/10 hover:-translate-y-1">
        <!-- Card Badge -->
        <div class="absolute top-4 right-4 z-10">
            <span class="px-3 py-1 bg-gradient-to-r from-blue-600 to-primary text-xs font-semibold text-white rounded-full tracking-wide shadow-lg">LIMITED EDITION</span>
        </div>

        <!-- Magnetic Button Effect Container -->
        <div class="magnetic-container w-full h-80 overflow-hidden relative">
            <!-- Product Image with Parallax -->
            <img 
                id="pen-image" 
                src="https://images.unsplash.com/photo-1583485765087-80689dd3f4b9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" 
                alt="Premium titanium pen with ergonomic grip"
                class="w-full h-full object-contain scale-90 group-hover:scale-100 transition-transform duration-500"
            >
            
            <!-- Micro-Interaction Overlay -->
            <div class="absolute inset-0 bg-gradient-to-t from-dark/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
        </div>

        <!-- Product Details -->
        <div class="p-6">
            <div class="mb-4">
                <span class="text-primary text-sm font-medium">WRITING INSTRUMENTS</span>
                <h2 class="text-2xl font-bold text-white mt-1">PrecisionPro Titanium Pen</h2>
                <p class="text-gray-400 mt-2 text-sm">Zero-gravity balanced • Military-grade titanium • Lifetime ink guarantee</p>
            </div>

            <!-- Rating & Trust Badges -->
            <div class="flex items-center gap-3 mb-5">
                <div class="flex">
                    ★★★★☆ <span class="text-gray-500 ml-2 text-sm">127 reviews</span>
                </div>
                <div class="w-1 h-1 bg-gray-700 rounded-full"></div>
                <span class="text-green-500 text-sm flex items-center">
                    ✓ In stock
                </span>
            </div>

            <!-- Pricing -->
            <div class="flex items-baseline gap-3 mb-6">
                <span class="text-3xl font-bold text-white">$89</span>
                <span class="text-gray-500 line-through">$129</span>
                <span class="ml-auto text-primary font-semibold">31% OFF</span>
            </div>

            <!-- Add to Cart Button -->
            <button 
                id="add-to-cart" 
                class="w-full py-4 bg-gradient-to-r from-blue-700 to-primary text-white font-semibold rounded-xl flex items-center justify-center gap-2 overflow-hidden"
            >
                <span>Add to Cart</span>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                </svg>
            </button>
        </div>

        <!-- Scarcity Indicator -->
        <div class="px-6 pb-4">
            <div class="flex justify-between text-xs text-gray-500 mb-1">
                <span>Hurry! Only 3 left</span>
                <span>92% sold</span>
            </div>
            <div class="w-full bg-gray-800 rounded-full h-2">
                <div class="bg-gradient-to-r from-blue-600 to-primary h-2 rounded-full" style="width: 92%"></div>
            </div>
        </div>
    </div>

    <!-- GSAP Animations -->
    <script>
        document.addEventListener('DOMContentLoaded', () => {
            // Magnetic button effect
            const magneticArea = document.querySelector('.magnetic-container');
            const cartButton = document.getElementById('add-to-cart');

            magneticArea.addEventListener('mousemove', (e) => {
                const rect = magneticArea.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const moveX = (x - centerX) / 15;
                const moveY = (y - centerY) / 15;
                
                gsap.to('#pen-image', {
                    duration: 0.5,
                    x: moveX,
                    y: moveY,
                    ease: "power2.out"
                });
            });

            magneticArea.addEventListener('mouseleave', () => {
                gsap.to('#pen-image', {
                    duration: 0.7,
                    x: 0,
                    y: 0,
                    ease: "elastic.out(1, 0.5)"
                });
            });

            // Button hover animation
            cartButton.addEventListener('mouseenter', () => {
                gsap.to(cartButton, {
                    duration: 0.3,
                    scale: 1.05,
                    background: 'linear-gradient(45deg, #1E90FF, #0066CC)',
                    boxShadow: '0 0 20px rgba(30, 144, 255, 0.5)'
                });
            });

            cartButton.addEventListener('mouseleave', () => {
                gsap.to(cartButton, {
                    duration: 0.3,
                    scale: 1,
                    background: 'linear-gradient(45deg, #1E90FF, #1E90FF)',
                    boxShadow: 'none'
                });
            });

            // Scroll-based reveal for multiple cards
            ScrollTrigger.batch(".group", {
                onEnter: batch => gsap.from(batch, {
                    opacity: 0,
                    y: 50,
                    stagger: 0.15,
                    duration: 0.8,
                    ease: "back.out(1.2)"
                }),
                once: true
            });
        });
    </script>
</body>
</html>}

Please refine the code above by:
 { make the price 200 in indian ruppe also add real image of pen}
`;

export const query_prompt = `create card for a product name of product is "pen" and add all nessesary things`;
