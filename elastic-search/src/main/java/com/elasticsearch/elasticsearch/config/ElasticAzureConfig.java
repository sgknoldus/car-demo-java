package com.elasticsearch.elasticsearch.config;

import co.elastic.clients.json.jackson.JacksonJsonpMapper;
import co.elastic.clients.transport.ElasticsearchTransport;
import co.elastic.clients.transport.rest_client.RestClientTransport;
import co.elastic.clients.util.ContentType;
import org.apache.http.HttpHeaders;
import org.apache.http.HttpHost;
import org.apache.http.HttpResponseInterceptor;
import org.apache.http.message.BasicHeader;

import org.elasticsearch.client.RestClient;
import org.elasticsearch.client.RestClientBuilder;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

import java.util.List;

@Profile("azure")
@Configuration
public class ElasticAzureConfig {
    @Value("${azure.elastic.hostname}")
    private String hostName;

    @Value("${azure.elastic.port}")
    private int port;

    @Bean
    public RestClient getResClient() {
        RestClientBuilder.HttpClientConfigCallback httpClientConfigCallback =
                httpClientBuilder -> httpClientBuilder.setDefaultHeaders(
                                List.of(new BasicHeader(HttpHeaders.CONTENT_TYPE, ContentType.APPLICATION_JSON)))
                        .addInterceptorLast((HttpResponseInterceptor) (response, context) ->
                                response.addHeader("X-Elastic-Product", "Elasticsearch"));
        return RestClient.builder(new HttpHost(hostName, port)).setHttpClientConfigCallback(httpClientConfigCallback).build();
    }

}
