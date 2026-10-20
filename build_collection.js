const fs = require('fs');
const path = require('path');

function uuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

function makeRequest(name, method, url, bodyType, bodyContent, headers, auth, description) {
  const item = {
    name: name,
    request: {
      method: method || 'GET',
      header: headers || [],
      url: {
        raw: url || '',
        protocol: '',
        host: [],
        path: []
      }
    },
    response: []
  };
  
  if (url) {
    try {
      const u = new URL(url);
      item.request.url.raw = url;
      item.request.url.protocol = u.protocol.replace(':', '');
      item.request.url.host = u.hostname.split('.');
      if (u.port) item.request.url.port = u.port;
      item.request.url.path = u.pathname.split('/').filter(p => p !== '');
    } catch(e) {
      item.request.url.raw = url;
    }
  }
  
  if (bodyType && bodyContent !== undefined && bodyContent !== null) {
    if (bodyType === 'json') {
      item.request.body = {
        mode: 'raw',
        raw: bodyContent,
        options: { raw: { language: 'json' } }
      };
    } else if (bodyType === 'text') {
      item.request.body = {
        mode: 'raw',
        raw: bodyContent,
        options: { raw: { language: 'text' } }
      };
    }
  }
  
  if (description) {
    item.request.description = description;
  }
  
  if (auth) {
    item.request.auth = auth;
  }
  
  return item;
}

const collection = {
  info: {
    _postman_id: uuid(),
    name: 'tests_matriz_v1',
    schema: 'https://schema.getpostman.com/json/collection/v2.1.0/collection.json'
  },
  item: []
};

// ===== CATEGORÍA A =====
const catA = { name: 'Categoría A', item: [] };

catA.item.push(makeRequest('SEND_EMAIL Estándar','POST','http://195.26.242.120:8000/v1/tasks/dispatch','json','{\r\n  "transaccion_id": "tx_p1_01",\r\n  "tenant_id": "empresa123",\r\n  "accion": "SEND_EMAIL",\r\n  "callback_url": "http://195.26.242.120:8000/v1/callbacks/n8n",\r\n  "meta": {\r\n    "usuario_id": "usr_4521",\r\n    "prioridad": "ALTA"\r\n  },\r\n  "destino": "217O00440@itsx.edu.mx",\r\n  "asunto": "📊 Reporte Semanal Automático: Estado Financiero Q3",\r\n  "body": "Estimado Director. Me comunico a usted para saber los datos sobre el Reporte semanal",\r\n  "cron_expression": "0 8 * * 1"\r\n}'));

catA.item.push(makeRequest('SEND_WHATSAPP Estándar','POST','http://195.26.242.120:8000/v1/tasks/dispatch','json','{\r\n  "transaccion_id": "tx_p1_02",\r\n  "tenant_id": "empresa123",\r\n  "accion": "SEND_WHATSAPP",\r\n  "callback_url": "http://195.26.242.120:8000/v1/callbacks/n8n",\r\n  "meta": {\r\n    "usuario_id": "usr_gerente_inventarios",\r\n    "prioridad": "CRITICAL"\r\n  },\r\n  "num_tel": "+5212281256261",\r\n  "mensaje": "ALERTA DE INVENTARIO: El producto Aceite Multigrado 20W50 en Sucursal 3 ha caído a 4 unidades.",\r\n  "detalles_alerta": {\r\n    "tipo_regla": "STOCK_MINIMO",\r\n    "sucursal_id": 3,\r\n    "producto_id": "PROD-9982"\r\n  }\r\n}'));

catA.item.push(makeRequest('GENERATE_EXCEL Estándar','POST','http://195.26.242.120:8000/v1/tasks/dispatch','json','{\r\n  "transaccion_id": "tx_p1_03",\r\n  "tenant_id": "empresa123",\r\n  "accion": "GENERATE_EXCEL",\r\n  "callback_url": "http://195.26.242.120:8000/v1/callbacks/n8n",\r\n  "meta": {\r\n    "usuario_id": "usr_4521",\r\n    "prioridad": "MEDIA"\r\n  },\r\n  "nombre_archivo_sugerido": "Ventas_Agosto_Sucursal5",\r\n  "solicitar_envio_correo": false,\r\n  "datos": [\r\n    {"fecha": "2026-08-01", "folio": "F-1021", "cliente": "Refaccionaria del Norte", "total_monto": 14500.00},\r\n    {"fecha": "2026-08-05", "folio": "F-1035", "cliente": "Taller Mecánico Central", "total_monto": 8200.50}\r\n  ]\r\n}'));

catA.item.push(makeRequest('GENERATE_PPTX Estándar','POST','http://195.26.242.120:8000/v1/tasks/dispatch','json','{\r\n  "transaccion_id": "tx_c1_26",\r\n  "tenant_id": "empresa123",\r\n  "accion": "GENERATE_PPTX",\r\n  "callback_url": "http://195.26.242.120:8000/v1/callbacks/n8n",\r\n  "meta": {\r\n    "usuario_id": "usr_4521",\r\n    "prioridad": "ALTA"\r\n  },\r\n  "requiere_certificacion": true,\r\n  "datos_certificacion": {\r\n    "solicitado_por": "Carlos Gómez (Gerente)",\r\n    "ip_origen": "192.168.1.50",\r\n    "timestamp_extraccion": "2026-10-04T10:30:00Z"\r\n  },\r\n  "presentation_title": "Reporte Anual de Resultados",\r\n  "slides": [\r\n    {"slide_type": "title_slide", "title": "Resultados Q3 2026", "subtitle": "Resumen Ejecutivo"},\r\n    {"slide_type": "content_slide","title": "Objetivos del Trimestre",\r\n      "bullets": [\r\n        "Aumentar la cuota de mercado en un 5%",\r\n        "Reducir costes operativos en un 10%",\r\n        "Lanzar el nuevo producto V2.0"\r\n      ]\r\n    }\r\n  ]\r\n}'));

catA.item.push(makeRequest('DB_PERSIST Estándar','POST','http://195.26.242.120:8000/v1/tasks/dispatch','json','{\r\n  "transaccion_id": "tx_p1_05",\r\n  "tenant_id": "empresa123",\r\n  "accion": "DB_PERSIST",\r\n  "callback_url": "http://195.26.242.120:8000/v1/callbacks/n8n",\r\n  "meta": {\r\n    "server": "cbinformatica.net,1475",\r\n    "data_base": "cberp",\r\n    "usuario_id": "usr_admin",\r\n    "prioridad": "MEDIA"\r\n  },\r\n  "entidad": "bitacora_auditoria",\r\n  "registro": {\r\n    "evento": "CIERRE_DIARIO",\r\n    "sucursal_id": 1,\r\n    "exitoso": true\r\n  }\r\n}'));

catA.item.push(makeRequest('Multicanal Simultáneo','POST','',null,null));

catA.item.push(makeRequest('Email con Copia (CC/CCO)','POST','http://195.26.242.120:8000/v1/tasks/dispatch','json','{\r\n  "transaccion_id": "tx_p1_07",\r\n  "tenant_id": "empresa123",\r\n  "accion": "SEND_EMAIL",\r\n  "callback_url": "http://195.26.242.120:8000/v1/callbacks/n8n",\r\n  "meta": {\r\n    "usuario_id": "usr_4521",\r\n    "prioridad": "ALTA"\r\n  },\r\n  "destino": "217O00440@itsx.edu.mx",\r\n  "cc":[\r\n    "moisesyahircalu3312@outlook.es",\r\n    "viofernandez49@gmail.com"\r\n  ],\r\n  "cco":[\r\n    "chavodel8673@gmail.com"\r\n  ],\r\n  "asunto": "📊 Reporte Semanal Automático: Estado Financiero Q3",\r\n  "body": "Estimado Director. Me comunico a usted para saber los datos sobre el Reporte semanal",\r\n  "cron_expression": "0 8 * * 1"\r\n  }'));

catA.item.push(makeRequest('WhatsApp con Emoji/UTF-8','POST','http://195.26.242.120:8000/v1/tasks/dispatch','json','{\r\n  "transaccion_id": "tx_p1_08",\r\n  "tenant_id": "empresa123",\r\n  "accion": "SEND_WHATSAPP",\r\n  "callback_url": "http://195.26.242.120:8000/v1/callbacks/n8n",\r\n  "meta": {\r\n    "usuario_id": "usr_gerente_inventarios",\r\n    "prioridad": "CRITICA"\r\n  },\r\n  "num_tel": "+5212281256261",\r\n  "mensaje": "⚠️ ALERTA DE INVENTARIO: El producto Aceite Multigrado 20W50 en Sucursal 3 ha caído a 4 unidades.⚠️",\r\n  "detalles_alerta": {\r\n    "tipo_regla": "STOCK_MINIMO",\r\n    "sucursal_id": 3,\r\n    "producto_id": "PROD-9982"\r\n  }\r\n}'));

collection.item.push(catA);

// ===== CATEGORÍA B =====
const catB = { name: 'Categoría B', item: [] };

catB.item.push(makeRequest('JSON Malformado','POST','http://195.26.242.120:8000/v1/tasks/dispatch','json','{\r\n  "transaccion_id": "tx_n1_09",\r\n  "tenant_id": "empresa123",\r\n  "accion": "SEND_WHATSAPP",\r\n  "callback_url": "http://195.26.242.120:8000/v1/callbacks/n8n",\r\n  "meta": {\r\n    "usuario_id": "usr_gerente_inventarios",\r\n    "prioridad": "CRITICA"\r\n  },\r\n  "num_tel": "+5212281256261",\r\n  "mensaje": "ALERTA DE INVENTARIO: El producto Aceite Multigrado 20W50 en Sucursal 3 ha caído a 4 unidades.",\r\n  "detalles_alerta": {\r\n    "tipo_regla": "STOCK_MINIMO",\r\n    "sucursal_id": 3,\r\n    "producto_id": "PROD-9982"\r\n  }'));

catB.item.push(makeRequest('Violación de Esquema','POST','http://195.26.242.120:8000/v1/tasks/dispatch','json','{\r\n  "transaccion_id": "tx_n1_10",\r\n  "tenant_id": "empresa123",\r\n  "accion": "SEND_WHATSAPP",\r\n  "callback_url": "http://195.26.242.120:8000/v1/callbacks/n8n",\r\n  "meta": {\r\n    "usuario_id": "usr_gerente_inventarios",\r\n    "prioridad": "CRITICA"\r\n  },\r\n  "mensaje": "ALERTA DE INVENTARIO: El producto Aceite Multigrado 20W50 en Sucursal 3 ha caído a 4 unidades.",\r\n  "detalles_alerta": {\r\n    "tipo_regla": "STOCK_MINIMO",\r\n    "sucursal_id": 3,\r\n    "producto_id": "PROD-9982"\r\n  }\r\n}'));

catB.item.push(makeRequest('Email Inválido','POST','http://195.26.242.120:8000/v1/tasks/dispatch','json','{\r\n  "transaccion_id": "tx_n1_11",\r\n  "tenant_id": "empresa123",\r\n  "accion": "SEND_EMAIL",\r\n  "callback_url": "http://195.26.242.120:8000/v1/callbacks/n8n",\r\n  "meta": {\r\n    "usuario_id": "usr_4521",\r\n    "prioridad": "ALTA"\r\n  },\r\n  "destino": "217O00440itsx.edu.mx",\r\n  "asunto": "📊 Reporte Semanal Automático: Estado Financiero Q3",\r\n  "body": "Estimado Director, adjunto encontrará el resumen consolidado.",\r\n  "cron_expression": "0 8 * * 1",\r\n  "adjunto": {\r\n    "tipo": "POWERPOINT",\r\n    "slides": []\r\n  }\r\n}',null,{ type: 'noauth' }));

catB.item.push(makeRequest('Accion Desconocida','POST','http://195.26.242.120:8000/v1/tasks/dispatch','json','{\r\n  "transaccion_id": "tx_n1_12",\r\n  "tenant_id": "empresa123",\r\n  "accion": "SEND_KUJ",\r\n  "callback_url": "http://195.26.242.120:8000/v1/callbacks/n8n",\r\n  "meta": {\r\n    "usuario_id": "usr_4521",\r\n    "prioridad": "ALTA"\r\n  },\r\n  "destino": "217O00440@itsx.edu.mx",\r\n  "asunto": "📊 Reporte Semanal Automático: Estado Financiero Q3",\r\n  "body": "Estimado Director, adjunto encontrará el resumen consolidado.",\r\n  "cron_expression": "0 8 * * 1",\r\n  "adjunto": {\r\n    "tipo": "POWERPOINT",\r\n    "slides": []\r\n  }\r\n}'));

catB.item.push(makeRequest('Caída Temporal de n8n','POST','http://195.26.242.120:8000/v1/tasks/dispatch','json','{\r\n  "transaccion_id": "tx_n1_13",\r\n  "tenant_id": "empresa123",\r\n  "accion": "SEND_EMAIL",\r\n  "callback_url": "http://195.26.242.120:8000/v1/callbacks/n8n",\r\n  "meta": {\r\n    "usuario_id": "usr_4521",\r\n    "prioridad": "ALTA"\r\n  },\r\n  "destino": "217O00440@itsx.edu.mx",\r\n  "asunto": "📊 Reporte Semanal Automático: Estado Financiero Q3",\r\n  "body": "Estimado Director, adjunto encontrará el resumen consolidado.",\r\n  "cron_expression": "0 8 * * 1",\r\n  "adjunto": {\r\n    "tipo": "POWERPOINT",\r\n    "slides": []\r\n  }\r\n}'));

catB.item.push(makeRequest('Agotamiento de Reintentos','POST','http://195.26.242.120:8000/v1/tasks/dispatch','json','{\r\n  "transaccion_id": "tx_n1_n14",\r\n  "tenant_id": "empresa123",\r\n  "accion": "SEND_EMAIL",\r\n  "callback_url": "http://195.26.242.120:8000/v1/callbacks/n8n",\r\n  "meta": {\r\n    "usuario_id": "usr_4521",\r\n    "prioridad": "ALTA"\r\n  },\r\n  "destino": "217O00440@itsx.edu.mx",\r\n  "asunto": "📊 Reporte Semanal Automático: Estado Financiero Q3",\r\n  "body": "Estimado Director, adjunto encontrará el resumen consolidado.",\r\n  "cron_expression": "0 8 * * 1",\r\n  "adjunto": {\r\n    "tipo": "POWERPOINT",\r\n    "slides": []\r\n  }\r\n}'));

catB.item.push(makeRequest('Timeout de Servicio','POST','http://195.26.242.120:8000/v1/tasks/dispatch','json','{\r\n  "transaccion_id": "tx_n1_15",\r\n  "tenant_id": "empresa123",\r\n  "accion": "SEND_EMAIL",\r\n  "callback_url": "http://195.26.242.120:8000/v1/callbacks/n8n",\r\n  "meta": {\r\n    "usuario_id": "usr_4521",\r\n    "prioridad": "ALTA"\r\n  },\r\n  "destino": "217O00440@itsx.edu.mx",\r\n  "asunto": "📊 Reporte Semanal Automático: Estado Financiero Q3",\r\n  "body": "Estimado Director, adjunto encontrará el resumen consolidado.",\r\n  "cron_expression": "0 8 * * 1",\r\n  "adjunto": {\r\n    "tipo": "POWERPOINT",\r\n    "slides": []\r\n  }\r\n}'));

catB.item.push(makeRequest('Tenant Inexistente','POST','http://195.26.242.120:8000/v1/tasks/dispatch','json','{\r\n  "transaccion_id": "tx_n1_16",\r\n  "tenant_id": "empresafalsa123",\r\n  "accion": "SEND_EMAIL",\r\n  "callback_url": "http://195.26.242.120:8000/v1/callbacks/n8n",\r\n  "meta": {\r\n    "usuario_id": "usr_4521",\r\n    "prioridad": "ALTA"\r\n  },\r\n  "destino": "217O00440@itsx.edu.mx",\r\n  "asunto": "📊 Reporte Semanal Automático: Estado Financiero Q3",\r\n  "body": "Estimado Director, adjunto encontrará el resumen consolidado.",\r\n  "cron_expression": "0 8 * * 1",\r\n  "adjunto": {\r\n    "tipo": "POWERPOINT",\r\n    "slides": []\r\n  }\r\n}'));

collection.item.push(catB);

// ===== CATEGORÍA C =====
const catC = { name: 'Categoría C', item: [] };

catC.item.push(makeRequest('Sin Encabezado HMAC','POST','http://195.26.242.120:5678/webhook/api','json','{\r\n  "transaccion_id": "tx_s1_17",\r\n  "tenant_id": "empresa123",\r\n  "accion": "SEND_EMAIL",\r\n  "callback_url": "http://195.26.242.120:8000/v1/callbacks/n8n",\r\n  "meta": {\r\n    "usuario_id": "usr_4521",\r\n    "prioridad": "ALTA"\r\n  },\r\n  "destino": "217O00440@itsx.edu.mx",\r\n  "asunto": "📊 Reporte Semanal Automático: Estado Financiero Q3",\r\n  "body": "Estimado Director, adjunto encontrará el resumen consolidado.",\r\n  "cron_expression": "0 8 * * 1",\r\n  "adjunto": {\r\n    "tipo": "POWERPOINT",\r\n    "slides": []\r\n  }\r\n}'));

catC.item.push(makeRequest('Clave HMAC Incorrecta','POST','http://195.26.242.120:8000/v1/tasks/dispatch','json','{\r\n  "transaccion_id": "tx_s1_18",\r\n  "tenant_id": "empresa123",\r\n  "accion": "SEND_EMAIL",\r\n  "callback_url": "http://195.26.242.120:8000/v1/callbacks/n8n",\r\n  "meta": {\r\n    "usuario_id": "usr_4521",\r\n    "prioridad": "ALTA"\r\n  },\r\n  "destino": "217O00440@itsx.edu.mx",\r\n  "asunto": "📊 Reporte Semanal Automático: Estado Financiero Q3",\r\n  "body": "Estimado Director, adjunto encontrará el resumen consolidado.",\r\n  "cron_expression": "0 8 * * 1"\r\n}',null,null,''));

catC.item.push(makeRequest('Alteración en Tránsito','POST','http://195.26.242.120:8000/v1/tasks/dispatch','json','{\r\n  "transaccion_id": "tx_s1_19",\r\n  "tenant_id": "empresa123",\r\n  "accion": "SEND_WHATSAPP",\r\n  "callback_url": "http://195.26.242.120:8000/v1/callbacks/n8n",\r\n  "meta": {\r\n    "usuario_id": "usr_gerente_inventarios",\r\n    "prioridad": "CRITICAL"\r\n  },\r\n  "num_tel": "+5212281256261",\r\n  "mensaje": "⚠️ ALERTA DE INVENTARIO: El producto Aceite Multigrado 20W50 en Sucursal 3 ha caído a 4 unidades.",\r\n  "detalles_alerta": {\r\n    "tipo_regla": "STOCK_MINIMO",\r\n    "sucursal_id": 3,\r\n    "producto_id": "PROD-9982"\r\n  }\r\n}',[{ key: 'X-signature-256', value: '' }]));

catC.item.push(makeRequest('Replay Attack','POST','http://195.26.242.120:8000/v1/tasks/dispatch','json','{\r\n  "transaccion_id": "tx_s1_20",\r\n  "tenant_id": "empresa123",\r\n  "accion": "DB_PERSIST",\r\n  "callback_url": "http://195.26.242.120:8000/v1/callbacks/n8n",\r\n  "meta": {\r\n    "server": "cbinformatica.net,1475",\r\n    "data_base": "cberp",\r\n    "usuario_id": "usr_admin",\r\n    "prioridad": "MEDIA",\r\n    "timestamp": "2026-10-15T08:00:00Z"\r\n  },\r\n  "entidad": "bitacora_auditoria",\r\n  "registro": {\r\n    "evento": "CIERRE_DIARIO",\r\n    "sucursal_id": 1,\r\n    "exitoso": true\r\n  }\r\n}'));

catC.item.push(makeRequest('Inyección SQL en Payload','POST','http://195.26.242.120:8000/v1/tasks/dispatch','json','{\r\n  "transaccion_id": "tx_s1_21",\r\n  "tenant_id": "empresa123",\r\n  "accion": "DB_PERSIST",\r\n  "callback_url": "http://195.26.242.120:8000/v1/callbacks/n8n",\r\n  "meta": {\r\n    "server": "cbinformatica.net,1475",\r\n    "data_base": "cberp",\r\n    "usuario_id": "usr_admin",\r\n    "prioridad": "MEDIA"\r\n  },\r\n  "entidad": "bitacora_auditoria",\r\n  "registro": {\r\n    "evento": "CIERRE_DIARIO\'; DROP TABLE bitacora_auditoria; --",\r\n    "sucursal_id": 1,\r\n    "exitoso": true\r\n  }\r\n}'));

catC.item.push(makeRequest('Cross-Site Scripting (XSS)','POST','http://195.26.242.120:8000/v1/tasks/dispatch','json','{\r\n  "transaccion_id": "tx_p1_01",\r\n  "tenant_id": "empresa123",\r\n  "accion": "SEND_EMAIL",\r\n  "callback_url": "http://195.26.242.120:8000/v1/callbacks/n8n",\r\n  "meta": {\r\n    "usuario_id": "usr_4521",\r\n    "prioridad": "ALTA"\r\n  },\r\n  "destino": "217O00440@itsx.edu.mx",\r\n  "asunto": "📊 Reporte Semanal Automático: Estado Financiero Q3",\r\n  "body": "Estimado Director, <script>alert(\'Robo de Sesión\');</script>",\r\n  "cron_expression": "0 8 * * 1"\r\n}'));

catC.item.push(makeRequest('Path Traversal en Archivos','POST','http://195.26.242.120:8000/v1/tasks/dispatch','json','{\r\n  "transaccion_id": "tx_s1_23",\r\n  "tenant_id": "empresa123",\r\n  "accion": "GENERATE_EXCEL",\r\n  "callback_url": "http://195.26.242.120:8000/v1/callbacks/n8n",\r\n  "meta": {\r\n    "usuario_id": "usr_4521",\r\n    "prioridad": "MEDIA"\r\n  },\r\n  "nombre_archivo_sugerido": "../../../etc/passwd",\r\n  "solicitar_envio_correo": false,\r\n  "datos": [\r\n    {"fecha": "2026-08-01", "folio": "F-1021", "cliente": "Refaccionaria del Norte", "total_monto": 14500.00},\r\n    {"fecha": "2026-08-05", "folio": "F-1035", "cliente": "Taller Mecánico Central", "total_monto": 8200.50}\r\n  ]\r\n}'));

catC.item.push(makeRequest('Payload Sobredimensionado','POST','http://195.26.242.120:8000/v1/tasks/dispatch','json','{\r\n  "transaccion_id": "tx_s1_24",\r\n  "tenant_id": "empresa123",\r\n  "accion": "SEND_EMAIL",\r\n  "callback_url": "http://195.26.242.120:8000/v1/callbacks/n8n",\r\n  "meta": {\r\n    "usuario_id": "usr_4521",\r\n    "prioridad": "ALTA"\r\n  },\r\n  "destino": "217O00440@itsx.edu.mx",\r\n  "asunto": "[PAYLOAD SOBREDIMENSIONADO - contenido truncado para exportación]",\r\n  "body": "Estimado Director, adjunto encontrará el resumen consolidado.",\r\n  "cron_expression": "0 8 * * 1",\r\n  "adjunto": {\r\n    "tipo": "POWERPOINT",\r\n    "slides": []\r\n  }\r\n}'));

collection.item.push(catC);

// ===== CATEGORÍA D =====
const catD = { name: 'Categoría D', item: [] };

catD.item.push(makeRequest('Excel de 5,000 Filas','POST','http://195.26.242.120:8000/v1/tasks/dispatch','json','{\r\n    "transaccion_id": "tx_c1_25",\r\n    "tenant_id": "empresa123",\r\n    "accion": "GENERATE_EXCEL",\r\n    "callback_url": "http://195.26.242.120:8000/v1/callbacks/n8n",\r\n    "meta": {\r\n        "usuario_id": "usr_4521",\r\n        "prioridad": "MEDIA"\r\n    },\r\n    "nombre_archivo_sugerido": "Ventas_Agosto_Sucursal5",\r\n    "solicitar_envio_correo": false,\r\n    "datos": [\r\n        {"id": 1, "fecha": "2026-10-16", "cliente": "Cliente 1", "monto": 100.50, "estado": "Pagado"},\r\n        {"id": 2, "fecha": "2026-10-16", "cliente": "Cliente 2", "monto": 200.75, "estado": "Pendiente"},\r\n        {"id": 3, "fecha": "2026-10-16", "cliente": "Cliente 3", "monto": 300.00, "estado": "Pagado"},\r\n        {"id": 4, "fecha": "2026-10-16", "cliente": "Cliente 4", "monto": 400.25, "estado": "Pendiente"},\r\n        {"id": 5, "fecha": "2026-10-16", "cliente": "Cliente 5", "monto": 500.50, "estado": "Pagado"}\r\n    ]\r\n}'));

catD.item.push(makeRequest('PPTX con 10 Slides','POST','http://195.26.242.120:8000/v1/tasks/dispatch','json','{\r\n  "transaccion_id": "tx_c1_26",\r\n  "tenant_id": "empresa123",\r\n  "accion": "GENERATE_PPTX",\r\n  "callback_url": "http://195.26.242.120:8000/v1/callbacks/n8n",\r\n  "meta": {\r\n    "usuario_id": "usr_4521",\r\n    "prioridad": "ALTA"\r\n  },\r\n  "requiere_certificacion": true,\r\n  "datos_certificacion": {\r\n    "solicitado_por": "Carlos Gómez (Gerente)",\r\n    "ip_origen": "192.168.1.50",\r\n    "timestamp_extraccion": "2026-10-04T10:30:00Z"\r\n  },\r\n  "presentation_title": "Reporte Anual de Resultados",\r\n  "slides": [\r\n    {"slide_type": "title_slide", "title": "Resultados Q3 2026", "subtitle": "Resumen Ejecutivo"},\r\n    {"slide_type": "content_slide","title": "Objetivos del Trimestre", "bullets": ["Aumentar la cuota de mercado en un 5%", "Reducir costes operativos en un 10%", "Lanzar el nuevo producto V2.0"]},\r\n    {"slide_type": "content_slide", "title": "Hitos Alcanzados", "bullets": ["Lanzamiento de V2.0 completado antes de lo previsto", "Apertura de dos nuevas sucursales", "Contratación del nuevo equipo de ventas"]},\r\n    {"slide_type": "content_slide", "title": "Desafíos", "bullets": ["Retrasos en la cadena de suministro", "Aumento de los costes de las materias primas", "Alta rotación en el departamento de soporte"]},\r\n    {"slide_type": "content_slide", "title": "Métricas Clave", "bullets": ["Ingresos: $1.2M (+8% YoY)", "Nuevos usuarios: 15,000", "Satisfacción del cliente: 92%"]},\r\n    {"slide_type": "content_slide", "title": "Análisis de la Competencia", "bullets": ["Competidor A lanzó una nueva campaña agresiva", "Competidor B experimentó problemas de servicio", "Nuestra cuota de mercado se mantiene estable"]},\r\n    {"slide_type": "content_slide", "title": "Plan de Acción - Q4", "bullets": ["Aumentar la inversión en marketing digital", "Optimizar el proceso de atención al cliente", "Iniciar el desarrollo de la versión 3.0"]},\r\n    {"slide_type": "content_slide", "title": "Presupuesto", "bullets": ["Presupuesto aprobado: $500,000", "Gasto estimado: $450,000", "Ahorro proyectado: $50,000"]},\r\n    {"slide_type": "content_slide", "title": "Riesgos y Mitigaciones", "bullets": ["Riesgo: Fluctuaciones monetarias. Mitigación: Coberturas financieras.", "Riesgo: Cambios regulatorios. Mitigación: Asesoría legal continua."]},\r\n    {"slide_type": "content_slide", "title": "Conclusión", "bullets": ["El trimestre ha sido exitoso en general.", "Estamos bien posicionados para el resto del año.", "Gracias a todo el equipo por su esfuerzo."]}\r\n  ]\r\n}'));

catD.item.push(makeRequest('PPTX con Gráficos Complejos','POST','http://195.26.242.120:8000/v1/tasks/dispatch','json','{\r\n  "transaccion_id": "tx_c1_27",\r\n  "tenant_id": "empresa123",\r\n  "accion": "GENERATE_PPTX",\r\n  "callback_url": "http://195.26.242.120:8000/v1/callbacks/n8n",\r\n  "meta": {\r\n    "usuario_id": "usr_4521",\r\n    "prioridad": "ALTA"\r\n  },\r\n  "requiere_certificacion": true,\r\n  "datos_certificacion": {\r\n    "solicitado_por": "Carlos Gómez (Gerente)",\r\n    "ip_origen": "192.168.1.50",\r\n    "timestamp_extraccion": "2026-10-04T10:30:00Z"\r\n  },\r\n  "presentation_title": "Auditoría de Gastos Operativos - Gráficos Complejos",\r\n  "slides": [\r\n    {"slide_number": 1, "slide_type": "title_slide", "title": "Reporte Ejecutivo Q3", "subtitle": "CB Informática"},\r\n    {"slide_number": 2, "layout": "advanced_chart", "title": "Comparativa de Rendimiento Operativo por Trimestre", "chart_config": {"chart_type": "clustered_bar", "title": "Ingresos vs Costos por Trimestre (USD)", "legend_position": "bottom", "show_values_on_bars": true, "x_axis": {"title": "Trimestres 2026", "categories": ["Q1", "Q2", "Q3", "Q4"]}, "y_axis": {"title": "Monto en Miles ($)", "min_value": 0, "max_value": 1200}, "series": [{"name": "Ingresos Brutos", "color_hex": "#1F77B4", "values": [850, 920, 1050, 1150]}, {"name": "Costos Operativos", "color_hex": "#FF7F0E", "values": [500, 530, 580, 600]}, {"name": "Margen Neto", "color_hex": "#2CA02C", "values": [350, 390, 470, 550]}]}, "takeaways": ["El margen neto creció un 57% desde Q1 a Q4 gracias al control de costos.", "Q4 representa el pico histórico de ingresos brutos."]},\r\n    {"slide_number": 3, "layout": "advanced_chart", "title": "Evolución de Retención y Conversión de Usuarios", "chart_config": {"chart_type": "line_polygon", "title": "Tasa de Conversión vs Retención Mensual (%)", "smooth_lines": true, "show_markers": true, "legend_position": "right", "x_axis": {"title": "Meses del Año", "categories": ["Ene", "Feb", "Mar", "Abr", "May", "Jun"]}, "y_axis": {"title": "Porcentaje (%)", "min_value": 0, "max_value": 100}, "series": [{"name": "Retención M1", "line_style": "solid", "color_hex": "#4B0082", "values": [65.4, 68.1, 70.5, 71.2, 75.0, 78.3]}, {"name": "Conversión Lead-to-Paid", "line_style": "solid", "color_hex": "#008080", "values": [12.1, 13.5, 12.8, 15.4, 18.2, 21.0]}, {"name": "Target Anual", "line_style": "dashed", "color_hex": "#D62728", "values": [15.0, 15.0, 15.0, 15.0, 15.0, 15.0]}]}, "takeaways": ["La tasa de conversión superó el target anual del 15% a partir de Abril.", "La retención M1 mantiene una tendencia positiva constante alcanzando el 78.3% en Junio."]}\r\n  ]\r\n}'));

catD.item.push(makeRequest('Email con Adjunto Dinámico','POST','http://195.26.242.120:8000/v1/tasks/dispatch','json','{\r\n  "transaccion_id": "tx_c1_28",\r\n  "tenant_id": "empresa123",\r\n  "accion": "SEND_EMAIL",\r\n  "callback_url": "http://195.26.242.120:8000/v1/callbacks/n8n",\r\n  "meta": {\r\n    "usuario_id": "usr_4521",\r\n    "prioridad": "ALTA"\r\n  },\r\n  "destino": "217O00440@itsx.edu.mx",\r\n  "asunto": "📊 Reporte Semanal Automático: Estado Financiero Q3 (PDF Adjunto)",\r\n  "body": "Estimado Director, adjunto encontrará el corte financiero recién generado en formato PDF.",\r\n  "adjunto": {\r\n    "tipo": "PDF",\r\n    "nombre_archivo": "Estado_Financiero_Q3.pdf",\r\n    "titulo_documento": "Estado Financiero Consolidado Q3 - 2026",\r\n    "datos": [\r\n      {\r\n        "concepto": "Ingresos Brutos",\r\n        "monto": 1050000.00\r\n      },\r\n      {\r\n        "concepto": "Costos Operativos",\r\n        "monto": 580000.00\r\n      },\r\n      {\r\n        "concepto": "Margen Neto",\r\n        "monto": 470000.00\r\n      }\r\n    ]\r\n  }\r\n}'));

catD.item.push(makeRequest('WhatsApp Masivo (Lote)','POST','http://195.26.242.120:8000/v1/tasks/dispatch','json','{\r\n  "transaccion_id": "tx_c1_29",\r\n  "tenant_id": "empresa123",\r\n  "accion": "SEND_WHATSAPP",\r\n  "callback_url": "http://195.26.242.120:8000/v1/callbacks/n8n",\r\n  "meta": {\r\n    "usuario_id": "usr_gerente_inventarios",\r\n    "prioridad": "ALTA"\r\n  },\r\n  "num_tel": ["+5212281256201","+5212281256202","+5212281256203","+5212281256204","+5212281256205","+5212281256206","+5212281256207","+5212281256208","+5212281256209","+5212281256210","+5212281256211","+5212281256212","+5212281256213","+5212281256214","+5212281256215","+5212281256216","+5212281256217","+5212281256218","+5212281256219","+5212281256220"],\r\n  "mensaje": "⚠️ ALERTA MASIVA DE INVENTARIO: Corte preventivo de almacén programado a las 18:00 hrs.",\r\n  "detalles_alerta": {\r\n    "tipo_regla": "NOTIFICACION_MASIVA_LOTE",\r\n    "sucursal_id": 3,\r\n    "total_destinatarios": 20\r\n  }\r\n}'));

catD.item.push(makeRequest('Excel con Múltiples Hojas','POST','http://195.26.242.120:8000/v1/tasks/dispatch','json','{\r\n  "transaccion_id": "tx_c1_30",\r\n  "tenant_id": "empresa123",\r\n  "accion": "GENERATE_EXCEL",\r\n  "callback_url": "http://195.26.242.120:8000/v1/callbacks/n8n",\r\n  "meta": {\r\n    "usuario_id": "usr_4521",\r\n    "prioridad": "MEDIA"\r\n  },\r\n  "nombre_archivo_sugerido": "Reporte_Financiero_Agosto",\r\n  "solicitar_envio_correo": false,\r\n  "hojas": [\r\n    {\r\n      "nombre": "Ventas",\r\n      "datos": [{"folio": "F-1021", "cliente": "Refaccionaria del Norte", "total_monto": 14500}, {"folio": "F-1035", "cliente": "Taller Mecánico Central", "total_monto": 8200.50}]\r\n    },\r\n    {\r\n      "nombre": "Costos",\r\n      "datos": [{"concepto": "Materiales", "monto": 9000}, {"concepto": "Transporte", "monto": 2500}]\r\n    },\r\n    {\r\n      "nombre": "Margen",\r\n      "datos": [{"concepto": "Ventas totales", "monto": 22700.50}, {"concepto": "Costos totales", "monto": 11500}, {"concepto": "Margen", "monto": 11200.50}]\r\n    }\r\n  ]\r\n}'));

catD.item.push(makeRequest('Tarea con Prioridad CRITICAL','POST','http://195.26.242.120:8000/v1/tasks/dispatch','json','{\r\n  "transaccion_id": "tx_c1_31",\r\n  "tenant_id": "empresa123",\r\n  "accion": "SEND_WHATSAPP",\r\n  "callback_url": "http://195.26.242.120:8000/v1/callbacks/n8n",\r\n  "meta": {\r\n    "usuario_id": "usr_gerente_inventarios",\r\n    "prioridad": "CRITICA"\r\n  },\r\n  "num_tel": "+5212281256261",\r\n  "mensaje": "⚠️ ALERTA DE INVENTARIO: El producto Aceite Multigrado 20W50 en Sucursal 3 ha caído a 4 unidades.",\r\n  "detalles_alerta": {\r\n    "tipo_regla": "STOCK_MINIMO",\r\n    "sucursal_id": 3,\r\n    "producto_id": "PROD-9982"\r\n  }\r\n}'));

catD.item.push(makeRequest('Recuperación tras Reinicio','POST','http://195.26.242.120:8000/v1/tasks/dispatch','text','docker compose exec redis ls -la /data\r\ndocker compose restart redis celery',null,null,'docker compose exec redis ls -la /data  \ndocker compose restart redis celery'));

collection.item.push(catD);

// ===== CATEGORÍA E =====
const catE = { name: 'Categoría E', item: [] };

catE.item.push(makeRequest('Métrica de Latencia API','POST','http://195.26.242.120:8000/v1/tasks/dispatch','json','{\r\n  "transaccion_id": "tx_p1_01",\r\n  "tenant_id": "empresa123",\r\n  "accion": "SEND_EMAIL",\r\n  "callback_url": "http://195.26.242.120:8000/v1/callbacks/n8n",\r\n  "meta": {\r\n    "usuario_id": "usr_4521",\r\n    "prioridad": "ALTA"\r\n  },\r\n  "destino": "217O00440@itsx.edu.mx",\r\n  "asunto": "📊 Reporte Semanal Automático: Estado Financiero Q3",\r\n  "body": "Estimado Director. Me comunico a usted para saber los datos sobre el Reporte semanal",\r\n  "cron_expression": "0 8 * * 1"\r\n}'));

catE.item.push(makeRequest('Conteo en Cola DLQ','POST','http://195.26.242.120:8000/v1/tasks/dispatch','json','',null,null,'docker compose exec redis redis-cli LLEN dlq'));

catE.item.push(makeRequest('Inspección de Bitácora','POST','http://195.26.242.120:8000/v1/tasks/dispatch','json','{\r\n  "transaccion_id": "tx_o1_36",\r\n  "tenant_id": "empresa123",\r\n  "accion": "GENERATE_PPTX",\r\n  "callback_url": "http://195.26.242.120:8000/v1/callbacks/n8n",\r\n  "meta": {\r\n    "usuario_id": "usr_4521",\r\n    "prioridad": "ALTA"\r\n  },\r\n  "requiere_certificacion": true,\r\n  "datos_certificacion": {\r\n    "solicitado_por": "Carlos Gómez (Gerente)",\r\n    "ip_origen": "192.168.1.50",\r\n    "timestamp_extraccion": "2026-10-04T10:30:00Z"\r\n  },\r\n  "presentation_title": "Reporte Anual de Resultados",\r\n  "slides": [\r\n    {"slide_type": "title_slide", "title": "Resultados Q3 2026", "subtitle": "Resumen Ejecutivo"},\r\n    {"slide_type": "content_slide","title": "Objetivos del Trimestre", "bullets": ["Aumentar la cuota de mercado en un 5%", "Reducir costes operativos en un 10%", "Lanzar el nuevo producto V2.0"]}\r\n  ]\r\n}'));

catE.item.push(makeRequest('Callback status: EXITO','POST','http://195.26.242.120:8000/v1/tasks/dispatch','json','{\r\n  "transaccion_id": "tx_O1_36",\r\n  "tenant_id": "empresa123",\r\n  "accion": "GENERATE_PPTX",\r\n  "callback_url": "http://195.26.242.120:8000/v1/callbacks/n8n",\r\n  "meta": {\r\n    "usuario_id": "usr_4521",\r\n    "prioridad": "ALTA"\r\n  },\r\n  "requiere_certificacion": true,\r\n  "datos_certificacion": {\r\n    "solicitado_por": "Carlos Gómez (Gerente)",\r\n    "ip_origen": "192.168.1.50",\r\n    "timestamp_extraccion": "2026-10-04T10:30:00Z"\r\n  },\r\n  "presentation_title": "Auditoría de Gastos Operativos",\r\n  "slides": [\r\n    {\r\n      "slide_type": "title_slide",\r\n      "title": "Reporte Q3",\r\n      "subtitle": "CB Informática"\r\n    }\r\n  ]\r\n}'));

catE.item.push(makeRequest('Callback status: NO_EXITO','POST','http://195.26.242.120:8000/v1/tasks/dispatch','json','{\r\n  "transaccion_id": "tx_o1_39",\r\n  "tenant_id": "empresa123",\r\n  "accion": "SEND_WHATSAPP",\r\n  "callback_url": "http://195.26.242.120:8000/v1/callbacks/n8n",\r\n  "meta": {\r\n    "usuario_id": "usr_gerente_inventarios",\r\n    "prioridad": "alto"\r\n  },\r\n  "num_tel": "+520000000000",\r\n  "mensaje": "Error"\r\n}'));

catE.item.push(makeRequest('Trazabilidad por transaccion_id','POST','http://195.26.242.120:8000/v1/tasks/dispatch','json','{\r\n  "transaccion_id": "tx_O1_39",\r\n  "tenant_id": "empresa123",\r\n  "accion": "SEND_EMAIL",\r\n  "callback_url": "http://195.26.242.120:8000/v1/callbacks/n8n",\r\n  "meta": {\r\n    "usuario_id": "usr_4521",\r\n    "prioridad": "ALTA"\r\n  },\r\n  "destino": "217O00440@itsx.edu.mx",\r\n  "asunto": "📊 Reporte Semanal Automático: Estado Financiero Q3",\r\n  "body": "Estimado Director. Me comunico a usted para saber los datos sobre el Reporte semanal",\r\n  "cron_expression": "0 8 * * 1"\r\n}',null,null,'docker compose exec db_audit psql -U cb_admin -d cb_saas_audit -c "SELECT transaccion_id, accion, http_status_middleware, latencia_ms, status_callback, fecha_creacion, fecha_actualizacion FROM bitacora_auditoria WHERE transaccion_id ILIKE \'tx_o1_39\';"'));

catE.item.push(makeRequest('Alerta de Memoria en Redis','POST','http://195.26.242.120:9121/metrics',null,null,null,null,'docker compose exec redis sh -c \'for i in $(seq 1 70); do redis-cli SET "basura:$i" "$(head -c 1000000 /dev/zero | tr "\\0" "A")" > /dev/null; echo "Inyectando mega $i..."; done\'\n\ncurl -s http://localhost:9121/metrics | grep -E "redis_memory_used_bytes|redis_memory_max_bytes"'));

collection.item.push(catE);

const outputPath = 'C:/Users/chavo/Downloads/Postman/tests_matriz_v1.postman_collection.json';
fs.writeFileSync(outputPath, JSON.stringify(collection, null, 2), 'utf8');
console.log('Collection written to:', outputPath);
console.log('File size:', fs.statSync(outputPath).size, 'bytes');
console.log('Items in collection:', collection.item.length);
collection.item.forEach(folder => {
  console.log(' -', folder.name, ':', folder.item.length, 'requests');
});
