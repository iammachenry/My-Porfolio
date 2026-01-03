import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { serveStatic } from 'hono/cloudflare-workers'

const app = new Hono()

// Enable CORS for API routes
app.use('/api/*', cors())

// Serve static files
app.use('/static/*', serveStatic({ root: './public' }))

// API route for contact form
app.post('/api/contact', async (c) => {
  const { name, email, company, message, service } = await c.req.json()
  
  // Basic validation
  if (!name || !email || !message) {
    return c.json({ success: false, error: 'Name, email, and message are required' }, 400)
  }
  
  // In production, you would send email or store in database
  // For now, just log and return success
  console.log('Contact form submission:', { name, email, company, message, service })
  
  return c.json({ 
    success: true, 
    message: 'Thank you for your message! I will get back to you soon.' 
  })
})

// Main page route
app.get('/', (c) => {
  return c.html(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Henry Imafidon - Salesforce Administrator & Consultant</title>
        <meta name="description" content="Salesforce Certified Administrator & Implementation Consultant specializing in CRM optimization, workflow automation, and process improvement.">
        
        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
        
        <!-- Tailwind CSS -->
        <script src="https://cdn.tailwindcss.com"></script>
        
        <!-- Font Awesome -->
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
        
        <!-- AOS Animation Library -->
        <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet">
        
        <!-- Chart.js for metrics -->
        <script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js"></script>
        
        <!-- Custom Styles -->
        <link href="/static/styles.css" rel="stylesheet">
        
        <style>
          body {
            font-family: 'Inter', sans-serif;
          }
          
          .gradient-bg {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          }
          
          .gradient-text {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          }
          
          .salesforce-blue {
            background: linear-gradient(135deg, #00A1E0 0%, #0070D2 100%);
          }
          
          .card-hover {
            transition: all 0.3s ease;
          }
          
          .card-hover:hover {
            transform: translateY(-8px);
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
          }
          
          .stat-counter {
            font-size: 3rem;
            font-weight: 800;
          }
          
          .floating {
            animation: floating 3s ease-in-out infinite;
          }
          
          @keyframes floating {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
          }
          
          .typing::after {
            content: '|';
            animation: blink 1s infinite;
          }
          
          @keyframes blink {
            0%, 50% { opacity: 1; }
            51%, 100% { opacity: 0; }
          }
          
          .btn-primary {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            transition: all 0.3s ease;
          }
          
          .btn-primary:hover {
            transform: scale(1.05);
            box-shadow: 0 10px 25px rgba(102, 126, 234, 0.4);
          }
          
          .certification-badge {
            background: white;
            border: 3px solid #0070D2;
            transition: all 0.3s ease;
          }
          
          .certification-badge:hover {
            transform: scale(1.1) rotate(5deg);
            box-shadow: 0 10px 30px rgba(0, 112, 210, 0.3);
          }
          
          .timeline-item::before {
            content: '';
            position: absolute;
            left: -30px;
            top: 0;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background: #667eea;
            border: 4px solid white;
            box-shadow: 0 0 0 4px #667eea;
          }
        </style>
    </head>
    <body class="bg-gray-50">
        
        <!-- Navigation -->
        <nav class="fixed w-full top-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex justify-between items-center h-16">
                    <div class="flex items-center">
                        <i class="fas fa-cloud text-3xl gradient-text"></i>
                        <span class="ml-3 text-xl font-bold text-gray-900">Henry Imafidon</span>
                    </div>
                    <div class="hidden md:flex space-x-8">
                        <a href="#home" class="text-gray-700 hover:text-purple-600 transition">Home</a>
                        <a href="#about" class="text-gray-700 hover:text-purple-600 transition">About</a>
                        <a href="#services" class="text-gray-700 hover:text-purple-600 transition">Services</a>
                        <a href="#case-studies" class="text-gray-700 hover:text-purple-600 transition">Case Studies</a>
                        <a href="#contact" class="text-gray-700 hover:text-purple-600 transition">Contact</a>
                    </div>
                    <button id="mobile-menu-btn" class="md:hidden text-gray-700">
                        <i class="fas fa-bars text-xl"></i>
                    </button>
                </div>
            </div>
            
            <!-- Mobile Menu -->
            <div id="mobile-menu" class="hidden md:hidden bg-white border-t">
                <div class="px-4 py-4 space-y-3">
                    <a href="#home" class="block text-gray-700 hover:text-purple-600">Home</a>
                    <a href="#about" class="block text-gray-700 hover:text-purple-600">About</a>
                    <a href="#services" class="block text-gray-700 hover:text-purple-600">Services</a>
                    <a href="#case-studies" class="block text-gray-700 hover:text-purple-600">Case Studies</a>
                    <a href="#contact" class="block text-gray-700 hover:text-purple-600">Contact</a>
                </div>
            </div>
        </nav>

        <!-- Hero Section -->
        <section id="home" class="pt-24 pb-20 gradient-bg">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div class="text-white" data-aos="fade-right">
                        <h1 class="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                            Transform Your CRM Into a <span class="text-yellow-300">Competitive Advantage</span>
                        </h1>
                        <p class="text-xl mb-4 text-purple-100">
                            Salesforce Administration & Implementation Services for Organizations Ready to Optimize Operations, Automate Processes, and Elevate Customer Experience
                        </p>
                        <p class="text-lg mb-8 leading-relaxed text-purple-50">
                            I'm Henry Imafidon, a <strong>Salesforce Certified Administrator</strong> and Implementation Consultant with 2+ years of customer experience expertise and a proven track record of designing scalable CRM solutions that drive measurable results.
                        </p>
                        <div class="flex flex-wrap gap-4">
                            <a href="#contact" class="btn-primary text-white px-8 py-4 rounded-lg font-semibold inline-flex items-center">
                                <i class="fas fa-calendar-check mr-2"></i>
                                Schedule Free Consultation
                            </a>
                            <a href="#services" class="bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-lg font-semibold inline-flex items-center hover:bg-white/30 transition">
                                <i class="fas fa-arrow-down mr-2"></i>
                                View Services
                            </a>
                        </div>
                        
                        <!-- Quick Stats -->
                        <div class="mt-12 grid grid-cols-3 gap-6">
                            <div class="text-center">
                                <div class="text-3xl font-bold text-yellow-300">5+</div>
                                <div class="text-sm text-purple-100">Certifications</div>
                            </div>
                            <div class="text-center">
                                <div class="text-3xl font-bold text-yellow-300">2+</div>
                                <div class="text-sm text-purple-100">Years Experience</div>
                            </div>
                            <div class="text-center">
                                <div class="text-3xl font-bold text-yellow-300">96%</div>
                                <div class="text-sm text-purple-100">Satisfaction Rate</div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="relative" data-aos="fade-left">
                        <div class="floating">
                            <div class="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
                                <div class="space-y-6">
                                    <div class="flex items-center space-x-4">
                                        <div class="w-16 h-16 bg-yellow-300 rounded-full flex items-center justify-center">
                                            <i class="fas fa-cloud text-purple-600 text-2xl"></i>
                                        </div>
                                        <div>
                                            <h3 class="text-white font-bold text-lg">Salesforce Certified</h3>
                                            <p class="text-purple-100">5 Active Certifications</p>
                                        </div>
                                    </div>
                                    
                                    <div class="bg-white/10 rounded-lg p-4">
                                        <div class="flex justify-between items-center mb-2">
                                            <span class="text-white text-sm">CRM Optimization</span>
                                            <span class="text-yellow-300 font-bold">98%</span>
                                        </div>
                                        <div class="h-2 bg-white/20 rounded-full overflow-hidden">
                                            <div class="h-full bg-gradient-to-r from-yellow-300 to-yellow-400" style="width: 98%"></div>
                                        </div>
                                    </div>
                                    
                                    <div class="bg-white/10 rounded-lg p-4">
                                        <div class="flex justify-between items-center mb-2">
                                            <span class="text-white text-sm">Process Automation</span>
                                            <span class="text-yellow-300 font-bold">95%</span>
                                        </div>
                                        <div class="h-2 bg-white/20 rounded-full overflow-hidden">
                                            <div class="h-full bg-gradient-to-r from-yellow-300 to-yellow-400" style="width: 95%"></div>
                                        </div>
                                    </div>
                                    
                                    <div class="bg-white/10 rounded-lg p-4">
                                        <div class="flex justify-between items-center mb-2">
                                            <span class="text-white text-sm">Implementation Success</span>
                                            <span class="text-yellow-300 font-bold">100%</span>
                                        </div>
                                        <div class="h-2 bg-white/20 rounded-full overflow-hidden">
                                            <div class="h-full bg-gradient-to-r from-yellow-300 to-yellow-400" style="width: 100%"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- About Section -->
        <section id="about" class="py-20 bg-white">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="text-center mb-16" data-aos="fade-up">
                    <h2 class="text-4xl md:text-5xl font-bold gradient-text mb-4">About Me</h2>
                    <p class="text-xl text-gray-600">Experience, Expertise, and Passion for CRM Excellence</p>
                </div>
                
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div data-aos="fade-right">
                        <div class="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl p-8">
                            <h3 class="text-2xl font-bold text-gray-900 mb-4">What Sets Me Apart</h3>
                            <p class="text-gray-700 leading-relaxed mb-6">
                                With over 2 years of progressive experience in Salesforce strategy, I bring a unique blend of technical expertise and business acumen to every project. My journey has taken me across multiple industries—<strong>eCommerce, technology, retail, oil and gas, and nonprofits</strong>—where I've consistently delivered solutions that address real business challenges.
                            </p>
                            <p class="text-gray-700 leading-relaxed mb-6">
                                My background in high-volume customer service operations—where I've managed <strong>50–100 daily customer interactions</strong> and achieved <strong>96% satisfaction rates</strong>—gives me invaluable insight into how CRM systems should function to serve both your team and your customers.
                            </p>
                            <p class="text-gray-700 leading-relaxed">
                                I'm particularly passionate about <strong>automation and process optimization</strong>. Whether it's implementing Flow automation to eliminate repetitive manual tasks, designing intuitive dashboards that give leadership real-time visibility, or structuring data management protocols that ensure data integrity, I focus on solutions that create lasting operational improvements.
                            </p>
                        </div>
                    </div>
                    
                    <div data-aos="fade-left">
                        <h3 class="text-2xl font-bold text-gray-900 mb-6">Professional Certifications</h3>
                        <div class="grid grid-cols-2 gap-4 mb-8">
                            <div class="certification-badge rounded-xl p-6 text-center">
                                <i class="fas fa-certificate text-4xl text-blue-600 mb-3"></i>
                                <h4 class="font-bold text-gray-900 text-sm">Salesforce Certified Administrator</h4>
                            </div>
                            <div class="certification-badge rounded-xl p-6 text-center">
                                <i class="fas fa-award text-4xl text-purple-600 mb-3"></i>
                                <h4 class="font-bold text-gray-900 text-sm">Sales Cloud Consultant</h4>
                            </div>
                            <div class="certification-badge rounded-xl p-6 text-center">
                                <i class="fas fa-medal text-4xl text-green-600 mb-3"></i>
                                <h4 class="font-bold text-gray-900 text-sm">Service Cloud Consultant</h4>
                            </div>
                            <div class="certification-badge rounded-xl p-6 text-center">
                                <i class="fas fa-star text-4xl text-yellow-600 mb-3"></i>
                                <h4 class="font-bold text-gray-900 text-sm">Agentforce Certified</h4>
                            </div>
                        </div>
                        
                        <div class="bg-gray-50 rounded-xl p-6">
                            <h4 class="font-bold text-gray-900 mb-4 flex items-center">
                                <i class="fas fa-chart-line text-purple-600 mr-2"></i>
                                Key Achievements
                            </h4>
                            <ul class="space-y-3">
                                <li class="flex items-start">
                                    <i class="fas fa-check-circle text-green-600 mt-1 mr-3"></i>
                                    <span class="text-gray-700"><strong>40% reduction</strong> in phone queue time through CRM optimization</span>
                                </li>
                                <li class="flex items-start">
                                    <i class="fas fa-check-circle text-green-600 mt-1 mr-3"></i>
                                    <span class="text-gray-700"><strong>₦1M+ daily revenue</strong> driven through process improvements</span>
                                </li>
                                <li class="flex items-start">
                                    <i class="fas fa-check-circle text-green-600 mt-1 mr-3"></i>
                                    <span class="text-gray-700"><strong>5+ hours weekly</strong> saved through workflow automation</span>
                                </li>
                                <li class="flex items-start">
                                    <i class="fas fa-check-circle text-green-600 mt-1 mr-3"></i>
                                    <span class="text-gray-700"><strong>96% satisfaction rate</strong> in customer service operations</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Services Section -->
        <section id="services" class="py-20 bg-gray-50">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="text-center mb-16" data-aos="fade-up">
                    <h2 class="text-4xl md:text-5xl font-bold gradient-text mb-4">Services</h2>
                    <p class="text-xl text-gray-600">End-to-End Salesforce Solutions That Drive Results</p>
                </div>
                
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    
                    <!-- Service 1 -->
                    <div class="bg-white rounded-2xl p-8 card-hover border border-gray-100" data-aos="fade-up" data-aos-delay="100">
                        <div class="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-6">
                            <i class="fas fa-cog text-white text-2xl"></i>
                        </div>
                        <h3 class="text-2xl font-bold text-gray-900 mb-4">Administration & Optimization</h3>
                        <p class="text-gray-600 mb-6">
                            Transform your CRM into a high-performing system with comprehensive administrative support and ongoing optimization.
                        </p>
                        <ul class="space-y-3 mb-6">
                            <li class="flex items-start text-sm text-gray-700">
                                <i class="fas fa-check text-green-600 mt-1 mr-2"></i>
                                User management & permissions
                            </li>
                            <li class="flex items-start text-sm text-gray-700">
                                <i class="fas fa-check text-green-600 mt-1 mr-2"></i>
                                Data quality & maintenance
                            </li>
                            <li class="flex items-start text-sm text-gray-700">
                                <i class="fas fa-check text-green-600 mt-1 mr-2"></i>
                                Reports & dashboards
                            </li>
                            <li class="flex items-start text-sm text-gray-700">
                                <i class="fas fa-check text-green-600 mt-1 mr-2"></i>
                                Security & compliance
                            </li>
                        </ul>
                        <span class="inline-block bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold">
                            Perfect for ongoing support
                        </span>
                    </div>
                    
                    <!-- Service 2 -->
                    <div class="bg-white rounded-2xl p-8 card-hover border border-gray-100" data-aos="fade-up" data-aos-delay="200">
                        <div class="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-6">
                            <i class="fas fa-rocket text-white text-2xl"></i>
                        </div>
                        <h3 class="text-2xl font-bold text-gray-900 mb-4">Implementation & Consulting</h3>
                        <p class="text-gray-600 mb-6">
                            Launch your Salesforce journey with confidence through strategic implementation and expert guidance.
                        </p>
                        <ul class="space-y-3 mb-6">
                            <li class="flex items-start text-sm text-gray-700">
                                <i class="fas fa-check text-green-600 mt-1 mr-2"></i>
                                Requirements & process mapping
                            </li>
                            <li class="flex items-start text-sm text-gray-700">
                                <i class="fas fa-check text-green-600 mt-1 mr-2"></i>
                                System design & configuration
                            </li>
                            <li class="flex items-start text-sm text-gray-700">
                                <i class="fas fa-check text-green-600 mt-1 mr-2"></i>
                                Data migration & integration
                            </li>
                            <li class="flex items-start text-sm text-gray-700">
                                <i class="fas fa-check text-green-600 mt-1 mr-2"></i>
                                User training & adoption
                            </li>
                        </ul>
                        <span class="inline-block bg-purple-50 text-purple-700 px-4 py-2 rounded-full text-sm font-semibold">
                            Ideal for new deployments
                        </span>
                    </div>
                    
                    <!-- Service 3 -->
                    <div class="bg-white rounded-2xl p-8 card-hover border border-gray-100" data-aos="fade-up" data-aos-delay="300">
                        <div class="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mb-6">
                            <i class="fas fa-chart-line text-white text-2xl"></i>
                        </div>
                        <h3 class="text-2xl font-bold text-gray-900 mb-4">Sales & Service Cloud</h3>
                        <p class="text-gray-600 mb-6">
                            Maximize Sales Cloud for lead management and Service Cloud for superior customer support operations.
                        </p>
                        <ul class="space-y-3 mb-6">
                            <li class="flex items-start text-sm text-gray-700">
                                <i class="fas fa-check text-green-600 mt-1 mr-2"></i>
                                Lead & opportunity optimization
                            </li>
                            <li class="flex items-start text-sm text-gray-700">
                                <i class="fas fa-check text-green-600 mt-1 mr-2"></i>
                                Case management setup
                            </li>
                            <li class="flex items-start text-sm text-gray-700">
                                <i class="fas fa-check text-green-600 mt-1 mr-2"></i>
                                Knowledge base creation
                            </li>
                            <li class="flex items-start text-sm text-gray-700">
                                <i class="fas fa-check text-green-600 mt-1 mr-2"></i>
                                Service analytics
                            </li>
                        </ul>
                        <span class="inline-block bg-green-50 text-green-700 px-4 py-2 rounded-full text-sm font-semibold">
                            Best for sales & support teams
                        </span>
                    </div>
                    
                    <!-- Service 4 -->
                    <div class="bg-white rounded-2xl p-8 card-hover border border-gray-100" data-aos="fade-up" data-aos-delay="100">
                        <div class="w-16 h-16 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl flex items-center justify-center mb-6">
                            <i class="fas fa-bolt text-white text-2xl"></i>
                        </div>
                        <h3 class="text-2xl font-bold text-gray-900 mb-4">Workflow Automation</h3>
                        <p class="text-gray-600 mb-6">
                            Eliminate inefficiencies and free up team time with automated workflows and intelligent process flows.
                        </p>
                        <ul class="space-y-3 mb-6">
                            <li class="flex items-start text-sm text-gray-700">
                                <i class="fas fa-check text-green-600 mt-1 mr-2"></i>
                                Flow design & implementation
                            </li>
                            <li class="flex items-start text-sm text-gray-700">
                                <i class="fas fa-check text-green-600 mt-1 mr-2"></i>
                                Automation audit
                            </li>
                            <li class="flex items-start text-sm text-gray-700">
                                <i class="fas fa-check text-green-600 mt-1 mr-2"></i>
                                Task automation & notifications
                            </li>
                            <li class="flex items-start text-sm text-gray-700">
                                <i class="fas fa-check text-green-600 mt-1 mr-2"></i>
                                Third-party integrations
                            </li>
                        </ul>
                        <span class="inline-block bg-yellow-50 text-yellow-700 px-4 py-2 rounded-full text-sm font-semibold">
                            Save 5+ hours weekly
                        </span>
                    </div>
                    
                    <!-- Service 5 -->
                    <div class="bg-white rounded-2xl p-8 card-hover border border-gray-100" data-aos="fade-up" data-aos-delay="200">
                        <div class="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center mb-6">
                            <i class="fas fa-heart text-white text-2xl"></i>
                        </div>
                        <h3 class="text-2xl font-bold text-gray-900 mb-4">Nonprofit NPSP</h3>
                        <p class="text-gray-600 mb-6">
                            Specialized support for nonprofits to improve donor management, fundraising, and program tracking.
                        </p>
                        <ul class="space-y-3 mb-6">
                            <li class="flex items-start text-sm text-gray-700">
                                <i class="fas fa-check text-green-600 mt-1 mr-2"></i>
                                NPSP configuration
                            </li>
                            <li class="flex items-start text-sm text-gray-700">
                                <i class="fas fa-check text-green-600 mt-1 mr-2"></i>
                                Donor & constituent management
                            </li>
                            <li class="flex items-start text-sm text-gray-700">
                                <i class="fas fa-check text-green-600 mt-1 mr-2"></i>
                                Grant & fundraising tracking
                            </li>
                            <li class="flex items-start text-sm text-gray-700">
                                <i class="fas fa-check text-green-600 mt-1 mr-2"></i>
                                Program management
                            </li>
                        </ul>
                        <span class="inline-block bg-red-50 text-red-700 px-4 py-2 rounded-full text-sm font-semibold">
                            Perfect for NGOs
                        </span>
                    </div>
                    
                    <!-- Custom Solution Card -->
                    <div class="bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl p-8 card-hover text-white" data-aos="fade-up" data-aos-delay="300">
                        <div class="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mb-6">
                            <i class="fas fa-puzzle-piece text-white text-2xl"></i>
                        </div>
                        <h3 class="text-2xl font-bold mb-4">Custom Solutions</h3>
                        <p class="mb-6 text-purple-100">
                            Need something specific? I design tailored Salesforce solutions that match your unique business requirements.
                        </p>
                        <a href="#contact" class="inline-flex items-center bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-purple-50 transition">
                            <i class="fas fa-comments mr-2"></i>
                            Let's Discuss
                        </a>
                    </div>
                    
                </div>
            </div>
        </section>

        <!-- Case Studies Section -->
        <section id="case-studies" class="py-20 bg-white">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="text-center mb-16" data-aos="fade-up">
                    <h2 class="text-4xl md:text-5xl font-bold gradient-text mb-4">Success Stories</h2>
                    <p class="text-xl text-gray-600">Real Results from Real Projects</p>
                </div>
                
                <div class="space-y-12">
                    
                    <!-- Case Study 1 -->
                    <div class="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 md:p-12" data-aos="fade-up">
                        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                            <div>
                                <div class="inline-block bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
                                    Sales Optimization
                                </div>
                                <h3 class="text-3xl font-bold text-gray-900 mb-4">Streamlining Lead Management and Reporting</h3>
                                <p class="text-gray-700 mb-4">
                                    <strong>Client:</strong> BlackForce (Technology Sector)
                                </p>
                                <p class="text-gray-700 mb-4">
                                    <strong>Challenge:</strong> The team struggled with disorganized lead tracking and inefficient reporting processes that made it difficult to understand sales pipeline health and forecast accurately.
                                </p>
                                <p class="text-gray-700 mb-6">
                                    <strong>Solution:</strong> Implemented comprehensive lead management system with automated lead scoring, customized reports, and intuitive dashboards providing real-time visibility into sales metrics.
                                </p>
                                <div class="space-y-2">
                                    <div class="flex items-center">
                                        <i class="fas fa-check-circle text-green-600 mr-3"></i>
                                        <span class="text-gray-700">Improved lead tracking efficiency</span>
                                    </div>
                                    <div class="flex items-center">
                                        <i class="fas fa-check-circle text-green-600 mr-3"></i>
                                        <span class="text-gray-700">Data-driven decision making enabled</span>
                                    </div>
                                    <div class="flex items-center">
                                        <i class="fas fa-check-circle text-green-600 mr-3"></i>
                                        <span class="text-gray-700">Streamlined sales processes</span>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="bg-white rounded-xl p-6">
                                <canvas id="chart1" height="300"></canvas>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Case Study 2 -->
                    <div class="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-8 md:p-12" data-aos="fade-up">
                        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                            <div class="order-2 lg:order-1 bg-white rounded-xl p-6">
                                <canvas id="chart2" height="300"></canvas>
                            </div>
                            
                            <div class="order-1 lg:order-2">
                                <div class="inline-block bg-yellow-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
                                    Automation Success
                                </div>
                                <h3 class="text-3xl font-bold text-gray-900 mb-4">Workflow Automation Reducing Manual Workload</h3>
                                <p class="text-gray-700 mb-4">
                                    <strong>Client:</strong> SandTechnologies (Oil & Gas Sector)
                                </p>
                                <p class="text-gray-700 mb-4">
                                    <strong>Challenge:</strong> The team was spending significant time on repetitive manual tasks, including data entry and status updates, reducing productivity and introducing opportunities for data quality issues.
                                </p>
                                <p class="text-gray-700 mb-6">
                                    <strong>Solution:</strong> Designed and implemented automated workflows and Flows that eliminated 5+ hours of weekly manual work while improving data accuracy.
                                </p>
                                <div class="grid grid-cols-2 gap-4">
                                    <div class="bg-white rounded-lg p-4 text-center">
                                        <div class="text-3xl font-bold text-yellow-600">5+</div>
                                        <div class="text-sm text-gray-600">Hours Saved Weekly</div>
                                    </div>
                                    <div class="bg-white rounded-lg p-4 text-center">
                                        <div class="text-3xl font-bold text-green-600">100%</div>
                                        <div class="text-sm text-gray-600">Data Accuracy</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Case Study 3 -->
                    <div class="bg-gradient-to-br from-green-50 to-teal-50 rounded-2xl p-8 md:p-12" data-aos="fade-up">
                        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                            <div>
                                <div class="inline-block bg-green-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
                                    Customer Service Excellence
                                </div>
                                <h3 class="text-3xl font-bold text-gray-900 mb-4">Enhancing Customer Service Operations at Scale</h3>
                                <p class="text-gray-700 mb-4">
                                    <strong>Client:</strong> Rovingheights Nigeria Limited
                                </p>
                                <p class="text-gray-700 mb-4">
                                    <strong>Challenge:</strong> High-volume customer service environment (50–100 daily interactions) required optimization to improve satisfaction, reduce queue times, and maintain service quality.
                                </p>
                                <p class="text-gray-700 mb-6">
                                    <strong>Solution:</strong> Implemented CRM process improvements, feedback systems, and team training that enhanced first-call resolution and streamlined customer interactions.
                                </p>
                                <div class="grid grid-cols-3 gap-4">
                                    <div class="bg-white rounded-lg p-4 text-center">
                                        <div class="text-2xl font-bold text-green-600">40%</div>
                                        <div class="text-xs text-gray-600">Queue Time Reduction</div>
                                    </div>
                                    <div class="bg-white rounded-lg p-4 text-center">
                                        <div class="text-2xl font-bold text-green-600">96%</div>
                                        <div class="text-xs text-gray-600">Satisfaction Rate</div>
                                    </div>
                                    <div class="bg-white rounded-lg p-4 text-center">
                                        <div class="text-2xl font-bold text-green-600">₦1M+</div>
                                        <div class="text-xs text-gray-600">Daily Revenue</div>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="bg-white rounded-xl p-6">
                                <canvas id="chart3" height="300"></canvas>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
        </section>

        <!-- Skills Section -->
        <section class="py-20 bg-gray-50">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="text-center mb-16" data-aos="fade-up">
                    <h2 class="text-4xl md:text-5xl font-bold gradient-text mb-4">Skills & Expertise</h2>
                    <p class="text-xl text-gray-600">Technical Excellence Meets Business Acumen</p>
                </div>
                
                <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                    
                    <div class="bg-white rounded-2xl p-8" data-aos="fade-up" data-aos-delay="100">
                        <div class="w-16 h-16 salesforce-blue rounded-xl flex items-center justify-center mb-6">
                            <i class="fas fa-cloud text-white text-2xl"></i>
                        </div>
                        <h3 class="text-xl font-bold text-gray-900 mb-4">Salesforce Platforms</h3>
                        <ul class="space-y-2 text-gray-700">
                            <li class="flex items-center">
                                <i class="fas fa-angle-right text-purple-600 mr-2"></i>
                                Sales Cloud
                            </li>
                            <li class="flex items-center">
                                <i class="fas fa-angle-right text-purple-600 mr-2"></i>
                                Service Cloud
                            </li>
                            <li class="flex items-center">
                                <i class="fas fa-angle-right text-purple-600 mr-2"></i>
                                Agentforce
                            </li>
                            <li class="flex items-center">
                                <i class="fas fa-angle-right text-purple-600 mr-2"></i>
                                NPSP (Nonprofit)
                            </li>
                            <li class="flex items-center">
                                <i class="fas fa-angle-right text-purple-600 mr-2"></i>
                                Flow Automation
                            </li>
                        </ul>
                    </div>
                    
                    <div class="bg-white rounded-2xl p-8" data-aos="fade-up" data-aos-delay="200">
                        <div class="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mb-6">
                            <i class="fas fa-tools text-white text-2xl"></i>
                        </div>
                        <h3 class="text-xl font-bold text-gray-900 mb-4">Technical Skills</h3>
                        <ul class="space-y-2 text-gray-700">
                            <li class="flex items-center">
                                <i class="fas fa-angle-right text-purple-600 mr-2"></i>
                                System Administration
                            </li>
                            <li class="flex items-center">
                                <i class="fas fa-angle-right text-purple-600 mr-2"></i>
                                Data Management
                            </li>
                            <li class="flex items-center">
                                <i class="fas fa-angle-right text-purple-600 mr-2"></i>
                                Custom Reports & Dashboards
                            </li>
                            <li class="flex items-center">
                                <i class="fas fa-angle-right text-purple-600 mr-2"></i>
                                Process Automation
                            </li>
                            <li class="flex items-center">
                                <i class="fas fa-angle-right text-purple-600 mr-2"></i>
                                Integration Planning
                            </li>
                        </ul>
                    </div>
                    
                    <div class="bg-white rounded-2xl p-8" data-aos="fade-up" data-aos-delay="300">
                        <div class="w-16 h-16 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl flex items-center justify-center mb-6">
                            <i class="fas fa-lightbulb text-white text-2xl"></i>
                        </div>
                        <h3 class="text-xl font-bold text-gray-900 mb-4">Business Skills</h3>
                        <ul class="space-y-2 text-gray-700">
                            <li class="flex items-center">
                                <i class="fas fa-angle-right text-purple-600 mr-2"></i>
                                Process Improvement
                            </li>
                            <li class="flex items-center">
                                <i class="fas fa-angle-right text-purple-600 mr-2"></i>
                                Change Management
                            </li>
                            <li class="flex items-center">
                                <i class="fas fa-angle-right text-purple-600 mr-2"></i>
                                User Training
                            </li>
                            <li class="flex items-center">
                                <i class="fas fa-angle-right text-purple-600 mr-2"></i>
                                Strategic Planning
                            </li>
                            <li class="flex items-center">
                                <i class="fas fa-angle-right text-purple-600 mr-2"></i>
                                Customer Success
                            </li>
                        </ul>
                    </div>
                    
                </div>
            </div>
        </section>

        <!-- Testimonials Section -->
        <section class="py-20 bg-white">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="text-center mb-16" data-aos="fade-up">
                    <h2 class="text-4xl md:text-5xl font-bold gradient-text mb-4">Client Testimonials</h2>
                    <p class="text-xl text-gray-600">What Clients Say About Working With Me</p>
                </div>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                    
                    <div class="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl p-8" data-aos="fade-right">
                        <div class="flex items-center mb-6">
                            <div class="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mr-4">
                                T
                            </div>
                            <div>
                                <h4 class="font-bold text-gray-900">ThankGod Okoro</h4>
                                <p class="text-gray-600 text-sm">Africa Ohana</p>
                            </div>
                        </div>
                        <div class="mb-4">
                            <i class="fas fa-star text-yellow-400"></i>
                            <i class="fas fa-star text-yellow-400"></i>
                            <i class="fas fa-star text-yellow-400"></i>
                            <i class="fas fa-star text-yellow-400"></i>
                            <i class="fas fa-star text-yellow-400"></i>
                        </div>
                        <p class="text-gray-700 italic">
                            "Henry's implementation of our Salesforce system was seamless. He took time to understand our unique business challenges and delivered a solution that our entire team embraced immediately. His attention to detail and communication throughout the process set him apart."
                        </p>
                    </div>
                    
                    <div class="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-8" data-aos="fade-left">
                        <div class="flex items-center mb-6">
                            <div class="w-16 h-16 bg-yellow-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mr-4">
                                J
                            </div>
                            <div>
                                <h4 class="font-bold text-gray-900">Jeff Ackerman</h4>
                                <p class="text-gray-600 text-sm">SandTechnologies</p>
                            </div>
                        </div>
                        <div class="mb-4">
                            <i class="fas fa-star text-yellow-400"></i>
                            <i class="fas fa-star text-yellow-400"></i>
                            <i class="fas fa-star text-yellow-400"></i>
                            <i class="fas fa-star text-yellow-400"></i>
                            <i class="fas fa-star text-yellow-400"></i>
                        </div>
                        <p class="text-gray-700 italic">
                            "The workflow automations Henry designed have saved our team hours every week. What impressed me most was his commitment to ensuring the solution actually worked for our team—not just in theory, but in practice."
                        </p>
                    </div>
                    
                </div>
            </div>
        </section>

        <!-- Contact Section -->
        <section id="contact" class="py-20 bg-gradient-to-br from-purple-600 to-blue-600">
            <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="text-center mb-12" data-aos="fade-up">
                    <h2 class="text-4xl md:text-5xl font-bold text-white mb-4">Ready to Transform Your Salesforce Operations?</h2>
                    <p class="text-xl text-purple-100">
                        Whether you're implementing Salesforce for the first time, optimizing an existing environment, or tackling a specific automation challenge, I'm here to help.
                    </p>
                </div>
                
                <div class="bg-white rounded-2xl p-8 md:p-12" data-aos="fade-up" data-aos-delay="200">
                    <form id="contact-form" class="space-y-6">
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label class="block text-gray-700 font-semibold mb-2">Name *</label>
                                <input type="text" name="name" required
                                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none transition">
                            </div>
                            <div>
                                <label class="block text-gray-700 font-semibold mb-2">Email *</label>
                                <input type="email" name="email" required
                                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none transition">
                            </div>
                        </div>
                        
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label class="block text-gray-700 font-semibold mb-2">Company</label>
                                <input type="text" name="company"
                                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none transition">
                            </div>
                            <div>
                                <label class="block text-gray-700 font-semibold mb-2">Service Interest</label>
                                <select name="service"
                                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none transition">
                                    <option value="">Select a service</option>
                                    <option value="administration">Administration & Optimization</option>
                                    <option value="implementation">Implementation & Consulting</option>
                                    <option value="sales-service">Sales & Service Cloud</option>
                                    <option value="automation">Workflow Automation</option>
                                    <option value="npsp">Nonprofit NPSP</option>
                                    <option value="custom">Custom Solution</option>
                                </select>
                            </div>
                        </div>
                        
                        <div>
                            <label class="block text-gray-700 font-semibold mb-2">Message *</label>
                            <textarea name="message" required rows="5"
                                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none transition"
                                placeholder="Tell me about your Salesforce needs..."></textarea>
                        </div>
                        
                        <button type="submit" 
                            class="w-full btn-primary text-white px-8 py-4 rounded-lg font-semibold text-lg inline-flex items-center justify-center">
                            <i class="fas fa-paper-plane mr-2"></i>
                            Send Message
                        </button>
                        
                        <div id="form-message" class="hidden"></div>
                    </form>
                    
                    <div class="mt-8 pt-8 border-t border-gray-200">
                        <div class="text-center">
                            <p class="text-gray-700 font-semibold mb-4">Or connect with me on:</p>
                            <div class="flex justify-center space-x-4">
                                <a href="https://linkedin.com/in/henryimafidon" target="_blank" 
                                   class="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-700 transition">
                                    <i class="fab fa-linkedin-in"></i>
                                </a>
                                <a href="mailto:henry@example.com" 
                                   class="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white hover:bg-purple-700 transition">
                                    <i class="fas fa-envelope"></i>
                                </a>
                                <a href="https://trailblazer.me/id/henryimafidon" target="_blank" 
                                   class="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white hover:bg-green-700 transition">
                                    <i class="fas fa-trophy"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Footer -->
        <footer class="bg-gray-900 text-white py-12">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    <div class="col-span-2">
                        <div class="flex items-center mb-4">
                            <i class="fas fa-cloud text-3xl gradient-text"></i>
                            <span class="ml-3 text-xl font-bold">Henry Imafidon</span>
                        </div>
                        <p class="text-gray-400 mb-4">
                            Salesforce Certified Administrator & Implementation Consultant helping organizations transform their CRM into a competitive advantage.
                        </p>
                        <div class="flex space-x-4">
                            <span class="text-gray-400 text-sm">7+ Years CX</span>
                            <span class="text-gray-400 text-sm">•</span>
                            <span class="text-gray-400 text-sm">5 Certifications</span>
                            <span class="text-gray-400 text-sm">•</span>
                            <span class="text-gray-400 text-sm">96% Satisfaction</span>
                        </div>
                    </div>
                    
                    <div>
                        <h4 class="font-bold mb-4">Quick Links</h4>
                        <ul class="space-y-2 text-gray-400">
                            <li><a href="#home" class="hover:text-white transition">Home</a></li>
                            <li><a href="#about" class="hover:text-white transition">About</a></li>
                            <li><a href="#services" class="hover:text-white transition">Services</a></li>
                            <li><a href="#case-studies" class="hover:text-white transition">Case Studies</a></li>
                            <li><a href="#contact" class="hover:text-white transition">Contact</a></li>
                        </ul>
                    </div>
                    
                    <div>
                        <h4 class="font-bold mb-4">Services</h4>
                        <ul class="space-y-2 text-gray-400">
                            <li>Administration</li>
                            <li>Implementation</li>
                            <li>Automation</li>
                            <li>Sales Cloud</li>
                            <li>Service Cloud</li>
                        </ul>
                    </div>
                </div>
                
                <div class="border-t border-gray-800 pt-8 text-center text-gray-400">
                    <p>&copy; 2026 Henry Imafidon. All rights reserved. Built with passion for Salesforce excellence.</p>
                </div>
            </div>
        </footer>

        <!-- Scripts -->
        <script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"></script>
        <script src="/static/app.js"></script>
        
    </body>
    </html>
  `)
})

export default app
