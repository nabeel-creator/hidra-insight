'use client';
import React, { useState } from 'react';
import { 
  BookOpen, 
  FileText, 
  Award, 
  Calendar, 
  Users, 
  ExternalLink, 
  Search, 
  Filter, 
  Download,
  Quote,
  Star,
  BarChart3,
  TrendingUp,
  Globe,
  Zap,
  Target,
  Lightbulb,
  ArrowRight,
  Eye
} from 'lucide-react';

const ResearchPublications = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedYear, setSelectedYear] = useState('all');

  // Research Publications Data
  const publications = [
    {
      id: 1,
      title: "Development of envelope curve for Indus and Jhelum river basin in Pakistan and estimation of upper bound by using envelope curve",
      authors: ["Haseeb Ahsan", "Ghulam Nabi", "M.Waseem Boota", "Tanveer Abbas"],
      journal: "Journal of Himalayan Earth Sciences, Pakistan",
      year: 2016,
      volume: "Vol 49, No.1",
      type: "Journal Article",
      category: "Hydrology",
      abstract: "This comprehensive study focuses on developing envelope curves for major river basins in Pakistan, specifically targeting the Indus and Jhelum river systems. The research provides critical insights into flood estimation and upper bound determination for water resource management in the region.",
      keywords: ["Envelope Curve", "Flood Estimation", "Indus Basin", "Jhelum Basin", "Upper Bound Analysis"],
      citations: 15,
      downloads: 342,
      status: "Published",
      impactScore: 4.2
    },
    {
      id: 2,
      title: "Estimation of Probable Maximum Precipitation for one day duration: A Case Study of Gujjar Khan in Potwar region, Pakistan",
      authors: ["M.Waseem Boota", "Ghulam Nabi", "Haseeb Ahsan", "Tanveer Abbas"],
      journal: "Journal of Himalayan Earth Sciences, Pakistan",
      year: 2015,
      volume: "Vol 48, No.2",
      type: "Journal Article", 
      category: "Meteorology",
      abstract: "An in-depth analysis of probable maximum precipitation (PMP) estimation techniques applied to the Gujjar Khan region in Pakistan's Potwar plateau. This study provides essential data for flood risk assessment and infrastructure design in semi-arid regions.",
      keywords: ["PMP", "Precipitation Analysis", "Potwar Region", "Flood Risk", "Climate Analysis"],
      citations: 22,
      downloads: 287,
      status: "Published",
      impactScore: 3.8
    },
    {
      id: 3,
      title: "Impacts of landuse changes on runoff generation in Simly watershed",
      authors: ["Tanveer Abbas", "Ghulam Nabi", "Muhammad Waseem Boota", "Fiaz Hussain", "Haseeb Ahsan"],
      journal: "Sci.Int.(Lahore)",
      year: 2015,
      volume: "27(4), 4083-4089",
      type: "Journal Article",
      category: "Watershed Management",
      abstract: "This research examines the relationship between land use changes and runoff patterns in the Simly watershed, providing crucial insights for sustainable water resource management and urban planning in Pakistan's capital region.",
      keywords: ["Land Use Change", "Runoff Analysis", "Watershed Management", "Simly Dam", "Urban Hydrology"],
      citations: 18,
      downloads: 201,
      status: "Published",
      impactScore: 3.5
    }
  ];

  // Research Areas
  const researchAreas = [
    {
      title: "Flood Risk Assessment",
      description: "Advanced methodologies for flood prediction and risk mitigation",
      icon: "🌊",
      projects: 12,
      publications: 8
    },
    {
      title: "Watershed Management",
      description: "Sustainable approaches to watershed conservation and management",
      icon: "🏔️",
      projects: 8,
      publications: 5
    },
    {
      title: "Precipitation Analysis",
      description: "Climate data analysis and extreme weather prediction",
      icon: "🌧️",
      projects: 6,
      publications: 4
    },
    {
      title: "River Basin Studies",
      description: "Comprehensive analysis of major river systems",
      icon: "🏞️",
      projects: 15,
      publications: 10
    }
  ];

  // Research Impact Stats
  const impactStats = [
    { label: "Total Publications", value: "25+", icon: <BookOpen className="w-6 h-6" /> },
    { label: "Total Citations", value: "150+", icon: <Quote className="w-6 h-6" /> },
    { label: "H-Index", value: "12", icon: <BarChart3 className="w-6 h-6" /> },
    { label: "Research Projects", value: "40+", icon: <Target className="w-6 h-6" /> }
  ];

  // Filter functions
  const filteredPublications = publications.filter(pub => {
    const matchesSearch = pub.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pub.authors.some(author => author.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesFilter = selectedFilter === 'all' || pub.category.toLowerCase() === selectedFilter.toLowerCase();
    const matchesYear = selectedYear === 'all' || pub.year.toString() === selectedYear;
    return matchesSearch && matchesFilter && matchesYear;
  });

  const PublicationCard = ({ publication }) => (
    <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300 group">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-2">
          <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-1 rounded-full">
            {publication.type}
          </span>
          <span className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-1 rounded-full">
            {publication.category}
          </span>
        </div>
        <div className="text-gray-500 text-sm">{publication.year}</div>
      </div>

      <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight group-hover:text-blue-600 transition-colors">
        {publication.title}
      </h3>

      <div className="flex items-center text-gray-600 mb-3">
        <Users className="w-4 h-4 mr-2 flex-shrink-0" />
        <p className="text-sm">
          {publication.authors.map((author, index) => (
            <span key={index} className={author === "Haseeb Ahsan" ? "font-semibold text-blue-600" : ""}>
              {author}{index < publication.authors.length - 1 ? ", " : ""}
            </span>
          ))}
        </p>
      </div>

      <div className="text-gray-600 text-sm mb-3">
        <span className="font-medium">{publication.journal}</span> • {publication.volume}
      </div>

      <p className="text-gray-700 leading-relaxed mb-4 text-sm">
        {publication.abstract}
      </p>

      <div className="flex flex-wrap gap-2 mb-4">
        {publication.keywords.map((keyword, index) => (
          <span key={index} className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
            {keyword}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="flex items-center space-x-4 text-sm text-gray-500">
          <div className="flex items-center">
            <Quote className="w-4 h-4 mr-1" />
            <span>{publication.citations} citations</span>
          </div>
          <div className="flex items-center">
            <Download className="w-4 h-4 mr-1" />
            <span>{publication.downloads} downloads</span>
          </div>
          <div className="flex items-center">
            <Star className="w-4 h-4 mr-1 text-yellow-500" />
            <span>{publication.impactScore}</span>
          </div>
        </div>
        <button className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center group-hover:translate-x-1 transition-transform">
          View Details <ExternalLink className="w-4 h-4 ml-1" />
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 right-10 w-72 h-72 bg-blue-500 rounded-full filter blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 left-10 w-96 h-96 bg-purple-500 rounded-full filter blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Research & <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-300">Publications</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Contributing to the advancement of water resources engineering through rigorous research, innovative methodologies, and impactful publications.
            </p>
          </div>

          {/* Impact Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {impactStats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="w-16 h-16 bg-white bg-opacity-10 backdrop-blur-lg rounded-xl mx-auto mb-4 flex items-center justify-center text-blue-300 group-hover:scale-110 transition-transform duration-300">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-300 group-hover:to-purple-300">
                  {stat.value}
                </div>
                <div className="text-gray-300 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Research Areas */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Research <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Focus Areas</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Specialized research domains contributing to sustainable water resource management and engineering excellence.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {researchAreas.map((area, index) => (
              <div key={index} className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 hover:shadow-lg transition-all duration-300 group cursor-pointer">
                <div className="text-4xl mb-4">{area.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                  {area.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                  {area.description}
                </p>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>{area.projects} Projects</span>
                  <span>{area.publications} Publications</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Search and Filter Section */}
        <section className="mb-12">
          <div className="bg-gray-50 rounded-2xl p-8">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="relative flex-1 max-w-lg">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search publications, authors, keywords..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div className="flex gap-4">
                <select
                  value={selectedFilter}
                  onChange={(e) => setSelectedFilter(e.target.value)}
                  className="px-4 py-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Categories</option>
                  <option value="hydrology">Hydrology</option>
                  <option value="meteorology">Meteorology</option>
                  <option value="watershed management">Watershed Management</option>
                </select>

                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="px-4 py-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Years</option>
                  <option value="2016">2016</option>
                  <option value="2015">2015</option>
                </select>
              </div>
            </div>
          </div>
        </section>

        {/* Publications List */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">
              Featured Publications ({filteredPublications.length})
            </h2>
            <div className="flex items-center text-gray-600">
              <TrendingUp className="w-5 h-5 mr-2" />
              <span className="text-sm">Sorted by Impact Score</span>
            </div>
          </div>

          <div className="space-y-6">
            {filteredPublications.map((publication) => (
              <PublicationCard key={publication.id} publication={publication} />
            ))}
          </div>

          {filteredPublications.length === 0 && (
            <div className="text-center py-12">
              <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No publications found</h3>
              <p className="text-gray-500">Try adjusting your search criteria or filters</p>
            </div>
          )}
        </section>

        {/* Research Impact */}
        <section className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white mb-16">
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Research Impact & Recognition</h2>
            <p className="text-xl text-blue-100 mb-8 leading-relaxed">
              My research contributions have been recognized by international journals and have significantly impacted water resource management practices in Pakistan and the broader South Asian region.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-white mb-2">150+</div>
                <div className="text-blue-200">Total Citations</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white mb-2">12</div>
                <div className="text-blue-200">H-Index Score</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white mb-2">5</div>
                <div className="text-blue-200">International Collaborations</div>
              </div>
            </div>
          </div>
        </section>

        {/* Journal Information */}
        <section>
          <div className="bg-gray-50 rounded-2xl p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
              Featured in Prestigious <span className="text-blue-600">Journals</span>
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Journal of Himalayan Earth Sciences</h3>
                <div className="space-y-2 text-sm text-gray-600 mb-4">
                  <div className="flex justify-between">
                    <span>ISSN:</span>
                    <span className="font-medium">1994-3237, 2305-6959</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Publisher:</span>
                    <span className="font-medium">University of Peshawar</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Category:</span>
                    <span className="font-medium">Earth Sciences</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Recognition:</span>
                    <span className="font-medium text-green-600">HEC Recognized</span>
                  </div>
                </div>
                <p className="text-gray-700 text-sm leading-relaxed">
                  A biannual journal managed by the National Centre of Excellence in Geology, University of Peshawar, Pakistan, recognized by Higher Education Commission (HEC) in "X" Category.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Sci.Int.(Lahore)</h3>
                <div className="space-y-2 text-sm text-gray-600 mb-4">
                  <div className="flex justify-between">
                    <span>Location:</span>
                    <span className="font-medium">Lahore, Pakistan</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Focus:</span>
                    <span className="font-medium">Multidisciplinary Science</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Publications:</span>
                    <span className="font-medium">Multiple Issues/Year</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Impact:</span>
                    <span className="font-medium text-blue-600">Regional Influence</span>
                  </div>
                </div>
                <p className="text-gray-700 text-sm leading-relaxed">
                  A multidisciplinary scientific journal covering various fields including environmental sciences, engineering, and technology research.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ResearchPublications;