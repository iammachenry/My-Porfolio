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
        <title>Henry Imafidon - 6X Salesforce Certified Professional</title>
        <meta name="description" content="6X Salesforce Certified Professional helping organizations transform operations with automated workflows and data-driven processes that increase efficiency by up to 40%.">
        
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
            background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          }
          
          .gradient-text {
            background: linear-gradient(135deg, #10b981 0%, #059669 100%);
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
            background: linear-gradient(135deg, #10b981 0%, #059669 100%);
            transition: all 0.3s ease;
          }
          
          .btn-primary:hover {
            transform: scale(1.05);
            box-shadow: 0 10px 25px rgba(16, 185, 129, 0.4);
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
            background: #10b981;
            border: 4px solid white;
            box-shadow: 0 0 0 4px #10b981;
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
                        <a href="#home" class="text-gray-700 hover:text-green-600 transition">Home</a>
                        <a href="#about" class="text-gray-700 hover:text-green-600 transition">About</a>
                        <a href="#services" class="text-gray-700 hover:text-green-600 transition">Services</a>
                        <a href="#case-studies" class="text-gray-700 hover:text-green-600 transition">Case Studies</a>
                        <a href="#contact" class="text-gray-700 hover:text-green-600 transition">Contact</a>
                    </div>
                    <button id="mobile-menu-btn" class="md:hidden text-gray-700">
                        <i class="fas fa-bars text-xl"></i>
                    </button>
                </div>
            </div>
            
            <!-- Mobile Menu -->
            <div id="mobile-menu" class="hidden md:hidden bg-white border-t">
                <div class="px-4 py-4 space-y-3">
                    <a href="#home" class="block text-gray-700 hover:text-green-600">Home</a>
                    <a href="#about" class="block text-gray-700 hover:text-green-600">About</a>
                    <a href="#services" class="block text-gray-700 hover:text-green-600">Services</a>
                    <a href="#case-studies" class="block text-gray-700 hover:text-green-600">Case Studies</a>
                    <a href="#contact" class="block text-gray-700 hover:text-green-600">Contact</a>
                </div>
            </div>
        </nav>

        <!-- Hero Section -->
        <section id="home" class="pt-24 pb-20 gradient-bg">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div class="text-white" data-aos="fade-right">
                        <!-- Professional Photo and Name -->
                        <div class="flex items-center gap-6 mb-8">
                            <img src="https://www.genspark.ai/api/files/s/hlRP9PrP" 
                                 alt="Henry Imafidon - Salesforce Certified Professional" 
                                 class="w-28 h-28 rounded-full border-4 border-yellow-300 shadow-2xl object-cover">
                            <div>
                                <h2 class="text-3xl font-bold text-yellow-300">Henry Imafidon</h2>
                                <p class="text-lg text-green-100">6X Salesforce Certified Professional</p>
                            </div>
                        </div>
                        
                        <h1 class="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                            Transform Your Salesforce Operations with <span class="text-yellow-300">Automated Workflows</span>
                        </h1>
                        <p class="text-xl mb-4 text-green-100">
                            Increase Efficiency by Up to 40% with Data-Driven Processes That Support Scalable Growth
                        </p>
                        <p class="text-lg mb-8 leading-relaxed text-green-50">
                            I'm a <strong>Salesforce Administrator and Implementation Consultant</strong> with 2+ years of Salesforce experience and 7+ years in customer experience, helping organizations transform their operations through automated workflows and data-driven strategies.
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
                                <div class="text-3xl font-bold text-yellow-300">6X</div>
                                <div class="text-sm text-green-100">Certified</div>
                            </div>
                            <div class="text-center">
                                <div class="text-3xl font-bold text-yellow-300">7+</div>
                                <div class="text-sm text-green-100">Years CX</div>
                            </div>
                            <div class="text-center">
                                <div class="text-3xl font-bold text-yellow-300">40%</div>
                                <div class="text-sm text-green-100">Efficiency Gain</div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="relative" data-aos="fade-left">
                        <div class="floating">
                            <div class="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
                                <div class="space-y-6">
                                    <div class="flex items-center space-x-4">
                                        <div class="w-16 h-16 bg-yellow-300 rounded-full flex items-center justify-center">
                                            <i class="fas fa-certificate text-green-600 text-2xl"></i>
                                        </div>
                                        <div>
                                            <h3 class="text-white font-bold text-lg">6X Salesforce Certified</h3>
                                            <p class="text-green-100">Administrator & Implementation</p>
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
                    <p class="text-xl text-gray-600">Resilience, Expertise, and Deep Empathy for Teams</p>
                </div>
                
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div data-aos="fade-right">
                        <div class="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8">
                            <!-- Photo in About Section -->
                            <div class="flex items-center gap-4 mb-6">
                                <img src="https://www.genspark.ai/api/files/s/hlRP9PrP" 
                                     alt="Henry Imafidon" 
                                     class="w-20 h-20 rounded-full border-3 border-green-600 shadow-lg object-cover">
                                <div>
                                    <h3 class="text-xl font-bold text-gray-900">Henry Imafidon</h3>
                                    <p class="text-sm text-gray-600">Salesforce Administrator & Implementation Consultant</p>
                                </div>
                            </div>
                            
                            <h3 class="text-2xl font-bold text-gray-900 mb-4">My Journey & What Sets Me Apart</h3>
                            <p class="text-gray-700 leading-relaxed mb-6">
                                My journey to becoming a <strong>6X Salesforce Certified Professional</strong> wasn't traditional. I overcame personal challenges including depression to build expertise that now helps teams achieve breakthrough results. This experience taught me <strong>resilience</strong> and gave me <strong>deep empathy</strong> for the operational challenges teams face daily.
                            </p>
                            <p class="text-gray-700 leading-relaxed mb-6">
                                With <strong>2+ years as a Salesforce Administrator and Implementation Consultant, plus 7+ years of customer experience</strong> across eCommerce, tech, and retail, I have unique insight into user behavior, operational pain points, and the systems teams need to thrive. This background helps me design Salesforce solutions that teams actually want to use.
                            </p>
                            <p class="text-gray-700 leading-relaxed">
                                I help organizations <strong>transform their Salesforce operations</strong> and enhance customer experience by designing <strong>automated workflows and data-driven processes</strong> that increase efficiency by up to 40%, reduce manual effort, and support scalable growth.
                            </p>
                        </div>
                    </div>
                    
                    <div data-aos="fade-left">
                        <h3 class="text-2xl font-bold text-gray-900 mb-6">6X Salesforce Certified Professional</h3>
                        <div class="grid grid-cols-2 gap-4 mb-8">
                            <div class="certification-badge rounded-xl p-6 text-center">
                                <i class="fas fa-certificate text-4xl text-green-600 mb-3"></i>
                                <h4 class="font-bold text-gray-900 text-sm">Certified Administrator</h4>
                            </div>
                            <div class="certification-badge rounded-xl p-6 text-center">
                                <i class="fas fa-award text-4xl text-green-600 mb-3"></i>
                                <h4 class="font-bold text-gray-900 text-sm">Implementation Consultant</h4>
                            </div>
                            <div class="certification-badge rounded-xl p-6 text-center">
                                <i class="fas fa-medal text-4xl text-green-600 mb-3"></i>
                                <h4 class="font-bold text-gray-900 text-sm">CX Professional</h4>
                            </div>
                            <div class="certification-badge rounded-xl p-6 text-center">
                                <i class="fas fa-trophy text-4xl text-green-600 mb-3"></i>
                                <h4 class="font-bold text-gray-900 text-sm">6X Certified</h4>
                            </div>
                        </div>
                        
                        <div class="bg-gray-50 rounded-xl p-6">
                            <h4 class="font-bold text-gray-900 mb-4 flex items-center">
                                <i class="fas fa-chart-line text-green-600 mr-2"></i>
                                Key Achievements
                            </h4>
                            <ul class="space-y-3">
                                <li class="flex items-start">
                                    <i class="fas fa-check-circle text-green-600 mt-1 mr-3"></i>
                                    <span class="text-gray-700"><strong>Up to 40% efficiency increase</strong> through automated workflows</span>
                                </li>
                                <li class="flex items-start">
                                    <i class="fas fa-check-circle text-green-600 mt-1 mr-3"></i>
                                    <span class="text-gray-700"><strong>2+ years SF Admin & Implementation | 7+ years CX</strong> across industries</span>
                                </li>
                                <li class="flex items-start">
                                    <i class="fas fa-check-circle text-green-600 mt-1 mr-3"></i>
                                    <span class="text-gray-700"><strong>Successful implementations</strong> reducing manual effort organization-wide</span>
                                </li>
                                <li class="flex items-start">
                                    <i class="fas fa-check-circle text-green-600 mt-1 mr-3"></i>
                                    <span class="text-gray-700"><strong>Data-driven processes</strong> supporting scalable growth</span>
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
                    <p class="text-xl text-gray-600">Comprehensive Salesforce Solutions That Transform Operations</p>
                </div>
                
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    
                    <!-- Service 1 -->
                    <div class="bg-white rounded-2xl p-8 card-hover border border-gray-100" data-aos="fade-up" data-aos-delay="100">
                        <div class="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mb-6">
                            <i class="fas fa-cog text-white text-2xl"></i>
                        </div>
                        <h3 class="text-2xl font-bold text-gray-900 mb-4">Administration & Configuration</h3>
                        <p class="text-gray-600 mb-6">
                            Complete platform setup, user management, and security optimization for peak performance.
                        </p>
                        <ul class="space-y-3 mb-6">
                            <li class="flex items-start text-sm text-gray-700">
                                <i class="fas fa-check text-green-600 mt-1 mr-2"></i>
                                Complete platform setup
                            </li>
                            <li class="flex items-start text-sm text-gray-700">
                                <i class="fas fa-check text-green-600 mt-1 mr-2"></i>
                                User management & permissions
                            </li>
                            <li class="flex items-start text-sm text-gray-700">
                                <i class="fas fa-check text-green-600 mt-1 mr-2"></i>
                                Security optimization
                            </li>
                            <li class="flex items-start text-sm text-gray-700">
                                <i class="fas fa-check text-green-600 mt-1 mr-2"></i>
                                System health monitoring
                            </li>
                        </ul>
                        <span class="inline-block bg-green-50 text-green-700 px-4 py-2 rounded-full text-sm font-semibold">
                            Foundation for success
                        </span>
                    </div>
                    
                    <!-- Service 2 -->
                    <div class="bg-white rounded-2xl p-8 card-hover border border-gray-100" data-aos="fade-up" data-aos-delay="200">
                        <div class="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mb-6">
                            <i class="fas fa-bolt text-white text-2xl"></i>
                        </div>
                        <h3 class="text-2xl font-bold text-gray-900 mb-4">Workflow Automation (Flows)</h3>
                        <p class="text-gray-600 mb-6">
                            Transform repetitive tasks into automated processes that save hours weekly and increase accuracy.
                        </p>
                        <ul class="space-y-3 mb-6">
                            <li class="flex items-start text-sm text-gray-700">
                                <i class="fas fa-check text-green-600 mt-1 mr-2"></i>
                                Flow design & implementation
                            </li>
                            <li class="flex items-start text-sm text-gray-700">
                                <i class="fas fa-check text-green-600 mt-1 mr-2"></i>
                                Process automation strategy
                            </li>
                            <li class="flex items-start text-sm text-gray-700">
                                <i class="fas fa-check text-green-600 mt-1 mr-2"></i>
                                Eliminate repetitive tasks
                            </li>
                            <li class="flex items-start text-sm text-gray-700">
                                <i class="fas fa-check text-green-600 mt-1 mr-2"></i>
                                Increase team efficiency
                            </li>
                        </ul>
                        <span class="inline-block bg-green-50 text-green-700 px-4 py-2 rounded-full text-sm font-semibold">
                            Save hours weekly
                        </span>
                    </div>
                    
                    <!-- Service 3 -->
                    <div class="bg-white rounded-2xl p-8 card-hover border border-gray-100" data-aos="fade-up" data-aos-delay="300">
                        <div class="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mb-6">
                            <i class="fas fa-chart-line text-white text-2xl"></i>
                        </div>
                        <h3 class="text-2xl font-bold text-gray-900 mb-4">CRM Optimization & Data Strategy</h3>
                        <p class="text-gray-600 mb-6">
                            Clean, accurate data architecture that drives better decision-making and operational excellence.
                        </p>
                        <ul class="space-y-3 mb-6">
                            <li class="flex items-start text-sm text-gray-700">
                                <i class="fas fa-check text-green-600 mt-1 mr-2"></i>
                                Data quality audits
                            </li>
                            <li class="flex items-start text-sm text-gray-700">
                                <i class="fas fa-check text-green-600 mt-1 mr-2"></i>
                                Data architecture design
                            </li>
                            <li class="flex items-start text-sm text-gray-700">
                                <i class="fas fa-check text-green-600 mt-1 mr-2"></i>
                                Process optimization
                            </li>
                            <li class="flex items-start text-sm text-gray-700">
                                <i class="fas fa-check text-green-600 mt-1 mr-2"></i>
                                Data governance strategy
                            </li>
                        </ul>
                        <span class="inline-block bg-green-50 text-green-700 px-4 py-2 rounded-full text-sm font-semibold">
                            Drive better decisions
                        </span>
                    </div>
                    
                    <!-- Service 4 -->
                    <div class="bg-white rounded-2xl p-8 card-hover border border-gray-100" data-aos="fade-up" data-aos-delay="100">
                        <div class="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mb-6">
                            <i class="fas fa-chart-bar text-white text-2xl"></i>
                        </div>
                        <h3 class="text-2xl font-bold text-gray-900 mb-4">Analytics & Reporting</h3>
                        <p class="text-gray-600 mb-6">
                            Custom dashboards that provide actionable insights for leadership and frontline teams.
                        </p>
                        <ul class="space-y-3 mb-6">
                            <li class="flex items-start text-sm text-gray-700">
                                <i class="fas fa-check text-green-600 mt-1 mr-2"></i>
                                Custom dashboard design
                            </li>
                            <li class="flex items-start text-sm text-gray-700">
                                <i class="fas fa-check text-green-600 mt-1 mr-2"></i>
                                Real-time reporting
                            </li>
                            <li class="flex items-start text-sm text-gray-700">
                                <i class="fas fa-check text-green-600 mt-1 mr-2"></i>
                                KPI tracking & monitoring
                            </li>
                            <li class="flex items-start text-sm text-gray-700">
                                <i class="fas fa-check text-green-600 mt-1 mr-2"></i>
                                Actionable insights
                            </li>
                        </ul>
                        <span class="inline-block bg-green-50 text-green-700 px-4 py-2 rounded-full text-sm font-semibold">
                            Data-driven decisions
                        </span>
                    </div>
                    
                    <!-- Service 5 -->
                    <div class="bg-white rounded-2xl p-8 card-hover border border-gray-100" data-aos="fade-up" data-aos-delay="200">
                        <div class="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mb-6">
                            <i class="fas fa-briefcase text-white text-2xl"></i>
                        </div>
                        <h3 class="text-2xl font-bold text-gray-900 mb-4">Service & Sales Operations</h3>
                        <p class="text-gray-600 mb-6">
                            Streamlined processes that improve lead conversion and case resolution efficiency.
                        </p>
                        <ul class="space-y-3 mb-6">
                            <li class="flex items-start text-sm text-gray-700">
                                <i class="fas fa-check text-green-600 mt-1 mr-2"></i>
                                Lead management optimization
                            </li>
                            <li class="flex items-start text-sm text-gray-700">
                                <i class="fas fa-check text-green-600 mt-1 mr-2"></i>
                                Case resolution workflows
                            </li>
                            <li class="flex items-start text-sm text-gray-700">
                                <i class="fas fa-check text-green-600 mt-1 mr-2"></i>
                                Sales process automation
                            </li>
                            <li class="flex items-start text-sm text-gray-700">
                                <i class="fas fa-check text-green-600 mt-1 mr-2"></i>
                                Service excellence frameworks
                            </li>
                        </ul>
                        <span class="inline-block bg-green-50 text-green-700 px-4 py-2 rounded-full text-sm font-semibold">
                            Boost conversions
                        </span>
                    </div>
                    
                    <!-- Custom Solution Card -->
                    <div class="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-8 card-hover text-white" data-aos="fade-up" data-aos-delay="300">
                        <div class="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mb-6">
                            <i class="fas fa-users text-white text-2xl"></i>
                        </div>
                        <h3 class="text-2xl font-bold mb-4">User Enablement & Training</h3>
                        <p class="mb-6 text-green-100">
                            Comprehensive support ensuring strong Salesforce adoption across all teams with hands-on training.
                        </p>
                        <a href="#contact" class="inline-flex items-center bg-white text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-green-50 transition">
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
                    <div class="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 md:p-12" data-aos="fade-up">
                        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                            <div>
                                <div class="inline-block bg-green-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
                                    Nonprofit Implementation
                                </div>
                                <h3 class="text-3xl font-bold text-gray-900 mb-4">Successful Salesforce Implementation for Africa Ohana</h3>
                                <p class="text-gray-700 mb-4">
                                    <strong>Client:</strong> Africa Ohana (Nonprofit Organization)
                                </p>
                                <p class="text-gray-700 mb-4">
                                    <strong>Challenge:</strong> Needed a functional Salesforce org to track programs, manage donations, and streamline operations for their growing mission-driven organization.
                                </p>
                                <p class="text-gray-700 mb-6">
                                    <strong>Solution:</strong> Contributed to successful Salesforce implementation as part of a collaborative team, creating a functional org with program tracking, donation management, and operational workflows.
                                </p>
                                <div class="space-y-2">
                                    <div class="flex items-center">
                                        <i class="fas fa-check-circle text-green-600 mr-3"></i>
                                        <span class="text-gray-700">Functional Salesforce org deployed</span>
                                    </div>
                                    <div class="flex items-center">
                                        <i class="fas fa-check-circle text-green-600 mr-3"></i>
                                        <span class="text-gray-700">Program tracking & donation management</span>
                                    </div>
                                    <div class="flex items-center">
                                        <i class="fas fa-check-circle text-green-600 mr-3"></i>
                                        <span class="text-gray-700">Team operates with confidence</span>
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
                                <i class="fas fa-angle-right text-green-600 mr-2"></i>
                                Process Improvement
                            </li>
                            <li class="flex items-center">
                                <i class="fas fa-angle-right text-green-600 mr-2"></i>
                                Change Management
                            </li>
                            <li class="flex items-center">
                                <i class="fas fa-angle-right text-green-600 mr-2"></i>
                                User Training
                            </li>
                            <li class="flex items-center">
                                <i class="fas fa-angle-right text-green-600 mr-2"></i>
                                Strategic Planning
                            </li>
                            <li class="flex items-center">
                                <i class="fas fa-angle-right text-green-600 mr-2"></i>
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
                    
                    <div class="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8" data-aos="fade-right">
                        <div class="flex items-center mb-6">
                            <div class="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mr-4">
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
                    
                    <div class="bg-gradient-to-br from-green-50 to-teal-50 rounded-2xl p-8" data-aos="fade-left">
                        <div class="flex items-center mb-6">
                            <div class="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mr-4">
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
        <section id="contact" class="py-20 bg-gradient-to-br from-green-500 to-emerald-600">
            <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="text-center mb-12" data-aos="fade-up">
                    <h2 class="text-4xl md:text-5xl font-bold text-white mb-4">Ready to Transform Your Salesforce Operations?</h2>
                    <p class="text-xl text-green-100">
                        Whether you're implementing Salesforce for the first time, optimizing an existing environment, or tackling a specific automation challenge, I'm here to help.
                    </p>
                </div>
                
                <div class="bg-white rounded-2xl p-8 md:p-12" data-aos="fade-up" data-aos-delay="200">
                    <form id="contact-form" class="space-y-6">
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label class="block text-gray-700 font-semibold mb-2">Name *</label>
                                <input type="text" name="name" required
                                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent outline-none transition">
                            </div>
                            <div>
                                <label class="block text-gray-700 font-semibold mb-2">Email *</label>
                                <input type="email" name="email" required
                                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent outline-none transition">
                            </div>
                        </div>
                        
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label class="block text-gray-700 font-semibold mb-2">Company</label>
                                <input type="text" name="company"
                                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent outline-none transition">
                            </div>
                            <div>
                                <label class="block text-gray-700 font-semibold mb-2">Service Interest</label>
                                <select name="service"
                                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent outline-none transition">
                                    <option value="">Select a service</option>
                                    <option value="administration">Administration & Configuration</option>
                                    <option value="automation">Workflow Automation (Flows)</option>
                                    <option value="crm-optimization">CRM Optimization & Data Strategy</option>
                                    <option value="analytics">Analytics & Reporting</option>
                                    <option value="operations">Service & Sales Operations</option>
                                    <option value="training">User Enablement & Training</option>
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
                                <a href="mailto:henryeromosele1@gmail.com" 
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
                            6X Salesforce Certified Professional - Salesforce Administrator and Implementation Consultant with 2+ years experience and 7+ years in customer experience, helping organizations transform operations with automated workflows that increase efficiency by up to 40%.
                        </p>
                        <div class="flex space-x-4">
                            <span class="text-gray-400 text-sm">6X Certified</span>
                            <span class="text-gray-400 text-sm">•</span>
                            <span class="text-gray-400 text-sm">2Yrs Admin & Implementation</span>
                            <span class="text-gray-400 text-sm">•</span>
                            <span class="text-gray-400 text-sm">7Yrs CX</span>
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
                            <li>Workflow Automation</li>
                            <li>CRM Optimization</li>
                            <li>Analytics</li>
                            <li>User Training</li>
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
