
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Smartphone, 
  QrCode, 
  Shield, 
  BarChart3, 
  ArrowRight,
  CheckCircle,
  Wifi,
  Database
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = () => {
  const features = [
    {
      icon: Smartphone,
      title: 'Gerenciamento de Dispositivos',
      description: 'Cadastre e monitore todos os seus dispositivos físicos com controle completo de status e localização.'
    },
    {
      icon: QrCode,
      title: 'QR Codes Automáticos',
      description: 'Geração automática de QR codes únicos baseados no MAC Address para acesso rápido às informações.'
    },
    {
      icon: Shield,
      title: 'Segurança Avançada',
      description: 'Sistema seguro com validação de MAC Address, logs de auditoria e controle de acesso robusto.'
    },
    {
      icon: BarChart3,
      title: 'Analytics e Relatórios',
      description: 'Acompanhe o uso, histórico de acessos e gere relatórios detalhados sobre seus dispositivos.'
    }
  ];

  const benefits = [
    'Controle centralizado de dispositivos',
    'Identificação rápida via QR code',
    'Histórico completo de atividades',
    'Interface moderna e responsiva',
    'Segurança empresarial',
    'Relatórios personalizados'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>
        <div className="container mx-auto px-6 py-20 relative">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Wifi className="w-4 h-4" />
              Sistema de Gerenciamento Profissional
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Gerencie Seus
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"> Dispositivos</span>
              <br />com QR Codes
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
              Solução completa para controle e monitoramento de dispositivos físicos através de QR codes inteligentes vinculados ao MAC Address.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/dashboard">
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 text-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1">
                  Acessar Dashboard
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Button variant="outline" className="px-8 py-3 text-lg border-2 hover:bg-gray-50">
                <QrCode className="w-5 h-5 mr-2" />
                Escanear QR Code
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Recursos Principais
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Tudo que você precisa para um gerenciamento eficiente de dispositivos
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="bg-white shadow-lg hover:shadow-xl transition-all duration-300 border-0 group hover:-translate-y-2">
              <CardHeader className="text-center pb-4">
                <div className="p-3 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl w-16 h-16 mx-auto mb-4 group-hover:scale-110 transition-transform duration-200">
                  <feature.icon className="w-10 h-10 text-blue-600 mx-auto" />
                </div>
                <CardTitle className="text-lg font-semibold text-gray-900">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Benefits Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Por que escolher nosso sistema?
              </h2>
              <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                Uma solução completa e segura para empresas que precisam de controle total sobre seus ativos tecnológicos.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-300 flex-shrink-0" />
                    <span className="text-blue-100">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <Card className="bg-white/10 backdrop-blur-sm border-white/20 shadow-2xl">
                <CardContent className="p-8">
                  <div className="text-center space-y-6">
                    <Database className="w-16 h-16 text-white mx-auto" />
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-2">Sistema Robusto</h3>
                      <p className="text-blue-100">
                        Arquitetura empresarial com alta disponibilidade e segurança avançada
                      </p>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="text-2xl font-bold text-white">99.9%</div>
                        <div className="text-xs text-blue-200">Uptime</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-white">24/7</div>
                        <div className="text-xs text-blue-200">Suporte</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-white">SSL</div>
                        <div className="text-xs text-blue-200">Seguro</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-6 py-20 text-center">
        <Card className="bg-gradient-to-r from-gray-50 to-blue-50 border-0 shadow-xl max-w-4xl mx-auto">
          <CardContent className="p-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Pronto para começar?
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Experimente nosso sistema de gerenciamento de dispositivos e veja como ele pode transformar o controle dos seus ativos tecnológicos.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/dashboard">
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 text-lg shadow-lg hover:shadow-xl transition-all duration-200">
                  Começar Agora
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
