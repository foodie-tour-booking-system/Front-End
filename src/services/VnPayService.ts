/**
 * This file was auto-generated. Please do not modify it directly.
 */
import { apiClient } from "../lib/apiClient.ts";

export interface ApplicationContext {
  parent?: ApplicationContext;
  id?: string;
  displayName?: string;
  autowireCapableBeanFactory?: AutowireCapableBeanFactory;
  applicationName?: string;
  startupDate?: number;
  environment?: Environment;
  beanDefinitionNames?: string[];
  beanDefinitionCount?: number;
  parentBeanFactory?: BeanFactory;
  classLoader?: any;
}

export interface AutowireCapableBeanFactory {
}

export interface BeanFactory {
}

export interface Environment {
  activeProfiles?: string[];
  defaultProfiles?: string[];
}

export interface FilterRegistration {
  urlPatternMappings?: string[];
  servletNameMappings?: string[];
  name?: string;
  className?: string;
  initParameters?: any;
}

export interface HttpStatusCode {
  error?: boolean;
  is5xxServerError?: boolean;
  is4xxClientError?: boolean;
  is2xxSuccessful?: boolean;
  is3xxRedirection?: boolean;
  is1xxInformational?: boolean;
}

export interface JspConfigDescriptor {
  taglibs?: TaglibDescriptor[];
  jspPropertyGroups?: JspPropertyGroupDescriptor[];
}

export interface JspPropertyGroupDescriptor {
  buffer?: string;
  defaultContentType?: string;
  urlPatterns?: string[];
  elIgnored?: string;
  pageEncoding?: string;
  includePreludes?: string[];
  includeCodas?: string[];
  isXml?: string;
  scriptingInvalid?: string;
  errorOnELNotFound?: string;
  errorOnUndeclaredNamespace?: string;
  deferredSyntaxAllowedAsLiteral?: string;
  trimDirectiveWhitespaces?: string;
}

export interface PaymentRequest {
  bookingId?: number;
  amount?: number;
}

export interface RedirectView {
  applicationContext?: ApplicationContext;
  servletContext?: ServletContext;
  contentType?: string;
  requestContextAttribute?: string;
  staticAttributes?: any;
  exposePathVariables?: boolean;
  exposeContextBeansAsAttributes?: boolean;
  exposedContextBeanNames?: string[];
  beanName?: string;
  url?: string;
  contextRelative?: boolean;
  http10Compatible?: boolean;
  exposeModelAttributes?: boolean;
  encodingScheme?: string;
  statusCode?: HttpStatusCode;
  expandUriTemplateVariables?: boolean;
  propagateQueryParams?: boolean;
  hosts?: string[];
  redirectView?: boolean;
  propagateQueryProperties?: boolean;
  attributes?: any;
  attributesMap?: any;
  attributesCSV?: string;
}

export interface ServletContext {
  classLoader?: any;
  majorVersion?: number;
  minorVersion?: number;
  attributeNames?: any;
  contextPath?: string;
  initParameterNames?: any;
  sessionTrackingModes?: string[];
  virtualServerName?: string;
  sessionCookieConfig?: SessionCookieConfig;
  sessionTimeout?: number;
  servletRegistrations?: any;
  effectiveSessionTrackingModes?: string[];
  responseCharacterEncoding?: string;
  defaultSessionTrackingModes?: string[];
  requestCharacterEncoding?: string;
  jspConfigDescriptor?: JspConfigDescriptor;
  effectiveMinorVersion?: number;
  filterRegistrations?: any;
  effectiveMajorVersion?: number;
  servletContextName?: string;
  serverInfo?: string;
}

export interface ServletRegistration {
  mappings?: string[];
  runAsRole?: string;
  name?: string;
  className?: string;
  initParameters?: any;
}

export interface SessionCookieConfig {
  domain?: string;
  maxAge?: number;
  name?: string;
  path?: string;
  attributes?: any;
  comment?: string;
  secure?: boolean;
  httpOnly?: boolean;
}

export interface TaglibDescriptor {
  taglibURI?: string;
  taglibLocation?: string;
}


export const VnPayService = {
  /**
   * POST /api/payment/vnpay/process-ipn
   */
  processIPNFromVnpay: async (body: any): Promise<any> => {
    const { data, error } = await apiClient.POST("/api/payment/vnpay/process-ipn" as any, { body: body as any });
    if (error) throw error;
    return data as any;
  },

  /**
   * POST /api/payment/vnpay/generate-payment-url
   */
  generatePaymentUrl: async (body: PaymentRequest): Promise<string> => {
    const { data, error } = await apiClient.POST("/api/payment/vnpay/generate-payment-url" as any, { body: body as any });
    if (error) throw error;
    return data as string;
  },

  /**
   * GET /api/payment/vnpay/status
   */
  processPaymentResponse: async (queryParams?: { queryParams: any }): Promise<RedirectView> => {
    const { data, error } = await apiClient.GET("/api/payment/vnpay/status" as any, { params: { query: queryParams } });
    if (error) throw error;
    return data as RedirectView;
  },

};
