import type { OrganizationalStructure } from '../../../types';

export const organizationalStructureData: OrganizationalStructure = {
  id: 'GEH-001',
  name: 'Grupo Empresarial Hodelpa',
  code: 'GEH',
  metadata: {
    totalEmployees: 2550,
    totalDepartments: 36,
    totalBranches: 15,
    lastUpdated: '2025-02-14T10:30:00',
    updatedBy: 'Ana Ramírez'
  },
  root: {
    id: 'HOD001',
    name: 'Hodelpa Hotels & Resorts',
    type: 'company',
    status: 'active',
    level: 1,
    metadata: {
      contact: {
        managerFullName: 'Roberto Henríquez Martínez',
        position: 'Director General',
        email: 'rhenriquez@hodelpa.com',
        phone: '809-580-1992',
        extension: '1001',
        physicalLocation: {
          building: 'Edificio Corporativo',
          floor: '8vo Piso',
          office: 'OF-801'
        }
      }
    },
    children: [
      {
        id: 'HOD-GA',
        name: 'Hodelpa Gran Almirante',
        type: 'branch',
        status: 'active',
        level: 2,
        metadata: {
          employeeCount: 350,
          contact: {
            managerFullName: 'Carlos Eduardo Sánchez',
            position: 'Gerente General',
            email: 'csanchez@hodelpa.com',
            phone: '809-580-1992',
            extension: '2001',
            physicalLocation: {
              building: 'Hotel Gran Almirante',
              floor: '1er Piso',
              office: 'OF-101'
            }
          }
        },
        children: [
          {
            id: 'HOD-GA-RH',
            name: 'Recursos Humanos',
            type: 'department',
            status: 'active',
            level: 3,
            metadata: {
              employeeCount: 15,
              contact: {
                managerFullName: 'María González Pérez',
                position: 'Directora de Recursos Humanos',
                email: 'mgonzalez@hodelpa.com',
                phone: '809-580-1992',
                extension: '2101',
                physicalLocation: {
                  building: 'Hotel Gran Almirante',
                  floor: '2do Piso',
                  office: 'OF-205'
                }
              }
            },
            children: [
              {
                id: 'HOD-GA-RH-REC',
                name: 'Reclutamiento y Selección',
                type: 'section',
                status: 'active',
                level: 4,
                metadata: {
                  employeeCount: 5,
                  contact: {
                    managerFullName: 'Ana Patricia Ramírez',
                    position: 'Coordinadora de Reclutamiento',
                    email: 'aramirez@hodelpa.com',
                    phone: '809-580-1992',
                    extension: '2102',
                    physicalLocation: {
                      building: 'Hotel Gran Almirante',
                      floor: '2do Piso',
                      office: 'OF-206'
                    }
                  }
                },
                children: [
                  {
                    id: 'HOD-GA-RH-REC-SEL',
                    name: 'Selección de Personal',
                    type: 'unit',
                    status: 'active',
                    level: 5,
                    metadata: {
                      employeeCount: 2,
                      contact: {
                        managerFullName: 'Laura Méndez Santos',
                        position: 'Analista de Selección',
                        email: 'lmendez@hodelpa.com',
                        phone: '809-580-1992',
                        extension: '2103',
                        physicalLocation: {
                          building: 'Hotel Gran Almirante',
                          floor: '2do Piso',
                          office: 'OF-207'
                        }
                      }
                    }
                  },
                  {
                    id: 'HOD-GA-RH-REC-ANA',
                    name: 'Evaluación y Desarrollo',
                    type: 'unit',
                    status: 'active',
                    level: 5,
                    metadata: {
                      employeeCount: 3,
                      contact: {
                        managerFullName: 'José Miguel Torres',
                        position: 'Analista de Desarrollo',
                        email: 'jtorres@hodelpa.com',
                        phone: '809-580-1992',
                        extension: '2104',
                        physicalLocation: {
                          building: 'Hotel Gran Almirante',
                          floor: '2do Piso',
                          office: 'OF-207'
                        }
                      }
                    }
                  }
                ]
              },
              {
                id: 'HOD-GA-RH-ADM',
                name: 'Administración de Personal',
                type: 'section',
                status: 'active',
                level: 4,
                metadata: {
                  employeeCount: 8,
                  contact: {
                    managerFullName: 'Carmen Luisa Díaz',
                    position: 'Coordinadora de Administración de Personal',
                    email: 'cdiaz@hodelpa.com',
                    phone: '809-580-1992',
                    extension: '2105',
                    physicalLocation: {
                      building: 'Hotel Gran Almirante',
                      floor: '2do Piso',
                      office: 'OF-208'
                    }
                  }
                },
                children: [
                  {
                    id: 'HOD-GA-RH-ADM-NOM',
                    name: 'Nómina y Compensación',
                    type: 'unit',
                    status: 'active',
                    level: 5,
                    metadata: {
                      employeeCount: 4,
                      contact: {
                        managerFullName: 'Pedro Martínez Reyes',
                        position: 'Encargado de Nómina',
                        email: 'pmartinez@hodelpa.com',
                        phone: '809-580-1992',
                        extension: '2106',
                        physicalLocation: {
                          building: 'Hotel Gran Almirante',
                          floor: '2do Piso',
                          office: 'OF-209'
                        }
                      }
                    }
                  },
                  {
                    id: 'HOD-GA-RH-ADM-BEN',
                    name: 'Beneficios y Bienestar',
                    type: 'unit',
                    status: 'active',
                    level: 5,
                    metadata: {
                      employeeCount: 4,
                      contact: {
                        managerFullName: 'Rosa María Fernández',
                        position: 'Coordinadora de Beneficios',
                        email: 'rfernandez@hodelpa.com',
                        phone: '809-580-1992',
                        extension: '2107',
                        physicalLocation: {
                          building: 'Hotel Gran Almirante',
                          floor: '2do Piso',
                          office: 'OF-210'
                        }
                      }
                    }
                  }
                ]
              }
            ]
          },
          {
            id: 'HOD-GA-FB',
            name: 'Alimentos y Bebidas',
            type: 'department',
            status: 'active',
            level: 3,
            metadata: {
              employeeCount: 120,
              contact: {
                managerFullName: 'Juan Carlos Pérez Mena',
                position: 'Director de Alimentos y Bebidas',
                email: 'jperez@hodelpa.com',
                phone: '809-580-1992',
                extension: '2201',
                physicalLocation: {
                  building: 'Hotel Gran Almirante',
                  floor: '1er Piso',
                  office: 'OF-105'
                }
              }
            },
            children: [
              {
                id: 'HOD-GA-FB-COC',
                name: 'Cocina Principal',
                type: 'section',
                status: 'active',
                level: 4,
                metadata: {
                  employeeCount: 45,
                  contact: {
                    managerFullName: 'Miguel Ángel Rodríguez',
                    position: 'Chef Ejecutivo',
                    email: 'mrodriguez@hodelpa.com',
                    phone: '809-580-1992',
                    extension: '2202',
                    physicalLocation: {
                      building: 'Hotel Gran Almirante',
                      floor: '1er Piso',
                      office: 'OF-106'
                    }
                  }
                }
              },
              {
                id: 'HOD-GA-FB-RES',
                name: 'Restaurantes',
                type: 'section',
                status: 'active',
                level: 4,
                metadata: {
                  employeeCount: 55,
                  contact: {
                    managerFullName: 'Patricia Hernández',
                    position: 'Gerente de Restaurantes',
                    email: 'phernandez@hodelpa.com',
                    phone: '809-580-1992',
                    extension: '2203',
                    physicalLocation: {
                      building: 'Hotel Gran Almirante',
                      floor: '1er Piso',
                      office: 'OF-107'
                    }
                  }
                }
              },
              {
                id: 'HOD-GA-FB-BAR',
                name: 'Bares',
                type: 'section',
                status: 'active',
                level: 4,
                metadata: {
                  employeeCount: 20,
                  contact: {
                    managerFullName: 'Luis Alberto Mejía',
                    position: 'Supervisor de Bares',
                    email: 'lmejia@hodelpa.com',
                    phone: '809-580-1992',
                    extension: '2204',
                    physicalLocation: {
                      building: 'Hotel Gran Almirante',
                      floor: '1er Piso',
                      office: 'OF-108'
                    }
                  }
                }
              }
            ]
          },
          {
            id: 'HOD-GA-HAB',
            name: 'División Habitaciones',
            type: 'department',
            status: 'active',
            level: 3,
            metadata: {
              employeeCount: 85,
              contact: {
                managerFullName: 'Isabel Martínez Gómez',
                position: 'Directora de División Habitaciones',
                email: 'imartinez@hodelpa.com',
                phone: '809-580-1992',
                extension: '2301',
                physicalLocation: {
                  building: 'Hotel Gran Almirante',
                  floor: '3er Piso',
                  office: 'OF-301'
                }
              }
            },
            children: [
              {
                id: 'HOD-GA-HAB-HK',
                name: 'Housekeeping',
                type: 'section',
                status: 'active',
                level: 4,
                metadata: {
                  employeeCount: 45,
                  contact: {
                    managerFullName: 'Ana María Santos',
                    position: 'Ama de Llaves Ejecutiva',
                    email: 'asantos@hodelpa.com',
                    phone: '809-580-1992',
                    extension: '2302',
                    physicalLocation: {
                      building: 'Hotel Gran Almirante',
                      floor: '3er Piso',
                      office: 'OF-302'
                    }
                  }
                }
              },
              {
                id: 'HOD-GA-HAB-LAV',
                name: 'Lavandería',
                type: 'section',
                status: 'active',
                level: 4,
                metadata: {
                  employeeCount: 20,
                  contact: {
                    managerFullName: 'Roberto Castillo',
                    position: 'Supervisor de Lavandería',
                    email: 'rcastillo@hodelpa.com',
                    phone: '809-580-1992',
                    extension: '2303',
                    physicalLocation: {
                      building: 'Hotel Gran Almirante',
                      floor: '1er Piso',
                      office: 'OF-109'
                    }
                  }
                }
              },
              {
                id: 'HOD-GA-HAB-REC',
                name: 'Recepción',
                type: 'section',
                status: 'active',
                level: 4,
                metadata: {
                  employeeCount: 20,
                  contact: {
                    managerFullName: 'Carolina Jiménez',
                    position: 'Supervisora de Recepción',
                    email: 'cjimenez@hodelpa.com',
                    phone: '809-580-1992',
                    extension: '2304',
                    physicalLocation: {
                      building: 'Hotel Gran Almirante',
                      floor: '1er Piso',
                      office: 'OF-102'
                    }
                  }
                }
              }
            ]
          }
        ]
      },
      {
        id: 'HOD-GC',
        name: 'Hodelpa Garden Court',
        type: 'branch',
        status: 'active',
        level: 2,
        metadata: {
          employeeCount: 280,
          contact: {
            managerFullName: 'Patricia Rodríguez Méndez',
            position: 'Gerente General',
            email: 'prodriguez@hodelpa.com',
            phone: '809-580-1992',
            extension: '3001',
            physicalLocation: {
              building: 'Hotel Garden Court',
              floor: '1er Piso',
              office: 'OF-101'
            }
          }
        },
        children: [
          {
            id: 'HOD-GC-OPS',
            name: 'Operaciones',
            type: 'department',
            status: 'active',
            level: 3,
            metadata: {
              employeeCount: 180,
              contact: {
                managerFullName: 'Fernando Castillo Vargas',
                position: 'Director de Operaciones',
                email: 'fcastillo@hodelpa.com',
                phone: '809-580-1992',
                extension: '3101',
                physicalLocation: {
                  building: 'Hotel Garden Court',
                  floor: '1er Piso',
                  office: 'OF-102'
                }
              }
            },
            children: [
              {
                id: 'HOD-GC-OPS-HAB',
                name: 'Habitaciones',
                type: 'section',
                status: 'active',
                level: 4,
                metadata: {
                  employeeCount: 85,
                  contact: {
                    managerFullName: 'Luisa Morales Santos',
                    position: 'Supervisora de Habitaciones',
                    email: 'lmorales@hodelpa.com',
                    phone: '809-580-1992',
                    extension: '3102',
                    physicalLocation: {
                      building: 'Hotel Garden Court',
                      floor: '2do Piso',
                      office: 'OF-201'
                    }
                  }
                },
                children: [
                  {
                    id: 'HOD-GC-OPS-HAB-HK',
                    name: 'Housekeeping',
                    type: 'unit',
                    status: 'active',
                    level: 5,
                    metadata: {
                      employeeCount: 45,
                      contact: {
                        managerFullName: 'Carmen Díaz Pérez',
                        position: 'Supervisora de Housekeeping',
                        email: 'cdiaz@hodelpa.com',
                        phone: '809-580-1992',
                        extension: '3103',
                        physicalLocation: {
                          building: 'Hotel Garden Court',
                          floor: '2do Piso',
                          office: 'OF-202'
                        }
                      }
                    }
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  children: [
    {
      id: 'CCN001',
      name: 'Grupo CCN',
      type: 'company',
      status: 'active',
      level: 1,
      metadata: {
        employeeCount: 1200,
        contact: {
          managerFullName: 'José Manuel Rodríguez',
          position: 'Presidente Ejecutivo',
          email: 'jrodriguez@ccn.com.do',
          phone: '809-537-5017',
          extension: '1001',
          physicalLocation: {
            building: 'Torre CCN',
            floor: '10mo Piso',
            office: 'OF-1001'
          }
        }
      },
      children: [
        {
          id: 'CCN-SUP',
          name: 'Supermercados Nacional',
          type: 'branch',
          status: 'active',
          level: 2,
          metadata: {
            employeeCount: 850,
            contact: {
              managerFullName: 'María Elena Santos',
              position: 'Directora General',
              email: 'msantos@nacional.com.do',
              phone: '809-537-5017',
              extension: '2001',
              physicalLocation: {
                building: 'Torre CCN',
                floor: '9no Piso',
                office: 'OF-901'
              }
            }
          },
          children: [
            {
              id: 'CCN-SUP-OPS',
              name: 'Operaciones Retail',
              type: 'department',
              status: 'active',
              level: 3,
              metadata: {
                employeeCount: 650,
                contact: {
                  managerFullName: 'Roberto Méndez',
                  position: 'Director de Operaciones',
                  email: 'rmendez@nacional.com.do',
                  phone: '809-537-5017',
                  extension: '2101',
                  physicalLocation: {
                    building: 'Torre CCN',
                    floor: '8vo Piso',
                    office: 'OF-801'
                  }
                }
              },
              children: [
                {
                  id: 'CCN-SUP-OPS-TIE',
                  name: 'Gestión de Tiendas',
                  type: 'section',
                  status: 'active',
                  level: 4,
                  metadata: {
                    employeeCount: 450,
                    contact: {
                      managerFullName: 'Carlos Jiménez',
                      position: 'Gerente de Tiendas',
                      email: 'cjimenez@nacional.com.do',
                      phone: '809-537-5017',
                      extension: '2102',
                      physicalLocation: {
                        building: 'Torre CCN',
                        floor: '8vo Piso',
                        office: 'OF-802'
                      }
                    }
                  },
                  children: [
                    {
                      id: 'CCN-SUP-OPS-TIE-SUC',
                      name: 'Supervisión de Sucursales',
                      type: 'unit',
                      status: 'active',
                      level: 5,
                      metadata: {
                        employeeCount: 25,
                        contact: {
                          managerFullName: 'Pedro Ramírez',
                          position: 'Supervisor Senior',
                          email: 'pramirez@nacional.com.do',
                          phone: '809-537-5017',
                          extension: '2103',
                          physicalLocation: {
                            building: 'Torre CCN',
                            floor: '8vo Piso',
                            office: 'OF-803'
                          }
                        }
                      }
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'BPD001',
      name: 'Banco Popular Dominicano',
      type: 'company',
      status: 'active',
      level: 1,
      metadata: {
        employeeCount: 5000,
        contact: {
          managerFullName: 'Manuel Alejandro Grullón',
          position: 'Presidente Ejecutivo',
          email: 'mgrullon@bpd.com.do',
          phone: '809-544-5000',
          extension: '1001',
          physicalLocation: {
            building: 'Torre Popular',
            floor: '15to Piso',
            office: 'OF-1501'
          }
        }
      },
      children: [
        {
          id: 'BPD-BCA',
          name: 'Banca Personal',
          type: 'branch',
          status: 'active',
          level: 2,
          metadata: {
            employeeCount: 2500,
            contact: {
              managerFullName: 'Francisco Ramírez',
              position: 'Vicepresidente Ejecutivo',
              email: 'framirez@bpd.com.do',
              phone: '809-544-5000',
              extension: '2001',
              physicalLocation: {
                building: 'Torre Popular',
                floor: '14to Piso',
                office: 'OF-1401'
              }
            }
          },
          children: [
            {
              id: 'BPD-BCA-SUC',
              name: 'Red de Sucursales',
              type: 'department',
              status: 'active',
              level: 3,
              metadata: {
                employeeCount: 1800,
                contact: {
                  managerFullName: 'Ana María Pérez',
                  position: 'Directora de Sucursales',
                  email: 'aperez@bpd.com.do',
                  phone: '809-544-5000',
                  extension: '2101',
                  physicalLocation: {
                    building: 'Torre Popular',
                    floor: '13er Piso',
                    office: 'OF-1301'
                  }
                }
              },
              children: [
                {
                  id: 'BPD-BCA-SUC-REG',
                  name: 'Región Norte',
                  type: 'section',
                  status: 'active',
                  level: 4,
                  metadata: {
                    employeeCount: 450,
                    contact: {
                      managerFullName: 'Luis García',
                      position: 'Gerente Regional',
                      email: 'lgarcia@bpd.com.do',
                      phone: '809-544-5000',
                      extension: '2102',
                      physicalLocation: {
                        building: 'Torre Popular',
                        floor: '13er Piso',
                        office: 'OF-1302'
                      }
                    }
                  },
                  children: [
                    {
                      id: 'BPD-BCA-SUC-REG-STI',
                      name: 'Zona Santiago',
                      type: 'unit',
                      status: 'active',
                      level: 5,
                      metadata: {
                        employeeCount: 150,
                        contact: {
                          managerFullName: 'Rosa Martínez',
                          position: 'Supervisora de Zona',
                          email: 'rmartinez@bpd.com.do',
                          phone: '809-544-5000',
                          extension: '2103',
                          physicalLocation: {
                            building: 'Torre Popular',
                            floor: '13er Piso',
                            office: 'OF-1303'
                          }
                        }
                      }
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};

export const nodeTypes = [
  { value: 'company', label: 'Compañía', icon: 'Building2' },
  { value: 'branch', label: 'Sucursal', icon: 'Building' },
  { value: 'department', label: 'Departamento', icon: 'Users' },
  { value: 'section', label: 'Sección', icon: 'FolderTree' },
  { value: 'unit', label: 'Unidad', icon: 'Briefcase' }
];