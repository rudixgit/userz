interface Welcome4 {
    welcome: Welcome;
    whyUs: WhyUs;
    services: Services;
}

interface Services {
    title: string;
    segments: Aws[];
    aws: Aws;
}

interface Aws {
    title: string;
    icon: string;
    description: string;
    segments?: Aws[];
}

interface Welcome {
    title: string;
    description: string;
}

interface WhyUs {
    title: string;
    segments: Segment[];
}

interface Segment {
    title: string;
    description: string;
    image: string;
}

export const contentxx: Welcome4 = {
    "welcome": {
        "title": "DevOps as Service",
        "description": "We have a strong commitment to our customers, and we work together with them to develop custom solutions to meet their specific requirements."
    },
    "whyUs": {
        "title": "Why Us",
        "segments": [
            {
                "title": "Enhance Your Service",
                "description": "Our team of experts can help you automate key processes and tasks that are critical to delivering high-quality customer service. We'll work with you to establish a robust infrastructure that ensures your services run smoothly and without interruption, reducing downtime and improving user experience.",
                "image": "url_to_enhance_service_image.jpg"
            },
            {
                "title": "Reduce Development Lifecycle",
                "description": "With RudixOps, you can enjoy efficient resource distribution that helps you meet your development goals faster and more efficiently, ultimately reducing your costs and time-to-market. Our continuous integration approach also enables us to catch and resolve issues early on in the development process, further streamlining the development lifecycle.",
                "image": "url_to_reduce_dev_lifecycle_image.jpg"
            },
            {
                "title": "Take Care of Your Data Security",
                "description": "We understand how important data security is to your business. That's why we provide comprehensive security solutions to help protect your data from unauthorized access and ensure compliance with the latest data protection regulations. With RudixOps, you can have peace of mind knowing your data is in safe hands.",
                "image": "url_to_data_security_image.jpg"
            }
        ]
    },
    "services": {
        "title": "Services",
        "segments": [
            {
                "title": "Planning",
                "icon": "fas fa-sitemap",
                "description": "By visualizing the intended state and identifying the traceable KPIs, we can develop a DevOps roadmap with precise, quantifiable targets."
            },
            {
                "title": "Integration",
                "icon": "fas fa-code-branch",
                "description": "Continuous Integration approach that can lower your organization's risk exposure by discovering issues early in the development process."
            },
            {
                "title": "Strategy & Design",
                "icon": "fas fa-pencil-ruler",
                "description": "Design and implement infrastructure that maximises your organization's maintainability, scalability, and security."
            },
            {
                "title": "Optimization",
                "icon": "fas fa-tachometer-alt",
                "description": "We can assess the current state of your cloud infrastructure and provide a full analysis of recommended adjustments and optimizations."
            },
            {
                "title": "Security",
                "icon": "fas fa-shield-alt",
                "description": "Assessing your risks, identifying security vulnerabilities and specific security requirements, prioritizing your security needs, and ensuring cloud security."
            },
            {
                "title": "Pay as you GROW",
                "icon": "fas fa-chart-line",
                "description": "We've been working in the cloud since the beginning and have extensive expertise working with businesses of all kinds, from start-ups to corporations, in a variety of industries."
            },
            {
                "title": "Culture",
                "icon": "fas fa-users",
                "description": "We can assist you in establishing Lean / Agile enablers for faster development cycles and continuous code output."
            },
            {
                "title": "Automation",
                "icon": "fas fa-robot",
                "description": "standardize operations, eliminate errors, and iterate faster by automating the way you create, deploy, and manage your cloud infrastructure."
            }
        ],
        "aws": {
            "title": "Improve your company's AWS Cloud usage",
            "icon": "aws",
            "description": "We design and implement robust, scalable cloud-native solutions that deliver high-performance, reliability, and cost-efficiency. Our AWS experts have extensive experience working with a wide range of AWS services, including EC2, S3, RDS, Lambda, and more. We can help you migrate your applications and data to the cloud, or optimize your existing AWS infrastructure to meet your business needs and goals. Our approach is based on industry best practices and AWS Well-Architected Framework principles, ensuring that your AWS environment is secure, efficient, and highly available. Contact us today to discuss how we can help you leverage the power of AWS for your business.",
            "segments": [
                {
                    "title": "AWS Infrastructure Design",
                    "icon": "architecture",
                    "description": "Our AWS architects can design and implement a cloud infrastructure that meets your specific requirements and is optimized for high availability, scalability, and security. We can help you choose the right AWS services and configure them to work seamlessly together, ensuring that your applications and data are always available and performant."
                },
                {
                    "title": "AWS Migration Services",
                    "icon": "cloud-upload",
                    "description": "Our AWS migration experts can help you migrate your applications and data to the cloud with minimal downtime and disruption. We'll work with you to plan and execute a migration strategy that minimizes risk and ensures a smooth transition to the cloud."
                },
                {
                    "title": "AWS Optimization",
                    "icon": "tune",
                    "description": "Our AWS optimization services can help you reduce your AWS costs and improve performance by identifying inefficiencies and implementing best practices. We'll analyze your AWS usage and provide recommendations for optimizing your architecture, right-sizing your resources, and automating your workflows."
                },
                {
                    "title": "AWS DevOps Services",
                    "icon": "code",
                    "description": "We can help you streamline your development and deployment workflows on AWS with our DevOps services. Our AWS experts can design and implement a CI/CD pipeline that automates your builds, tests, and deployments, enabling you to iterate faster and with higher quality."
                }
            ]
        }
    }
}