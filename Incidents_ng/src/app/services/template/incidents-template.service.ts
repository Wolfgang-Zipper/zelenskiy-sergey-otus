import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class IncidentTemplateService {
  public templates: Record<string, string> = {
    oneGateway: `Наблюдаем кратковременные задержки по шлюзу {{gatewayName}}. Мерчанты могут получать коды ошибок {{errorCodes}}. Вероятно причина на стороне банка. С поддержкой связались. Сообщим дополнительно. Началось с {{startTime}}. `,
    allGateway: `Наблюдаем массовые отклонения платежей по всем шлюзам с {{startTime}}. Мерчанты могут получать коды ошибок {{errorCodes}}. С причинами разбираемся. Сообщим дополнительно. `,
    infrastructure: `Наблюдаем таумАуты (или увеличенное время ответов на наши запросы со стороны банка) от нашего API {{bankTruble}}. Запросы в API со стороны мерчантов могут отваливаться по ТаймАуту. С причинами разбираемся. Сообщим дополнительно. `,
    cloudLk: `Наблюдаем недоступность {{lkType}}. При входе возникает ошибка {{errorCodes}}. С причинами разбираемся. Сообщим дополнительно.`,
  };

  constructor() {}

  getTemplate(type: string): string {
    return this.templates[type] || '';
  }

  fillTemplate(template: string, data: { [key: string]: string }): string {
    return template.replace(
      /\{\{(\w+)\}\}/g,
      (match, key) => data[key] || match,
    );
  }
}
