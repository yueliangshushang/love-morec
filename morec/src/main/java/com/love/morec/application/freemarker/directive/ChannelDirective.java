package com.love.morec.application.freemarker.directive;

import java.io.IOException;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;

import com.love.morec.application.channel.ChannelService;
import com.love.morec.domain.channel.Channel;

import freemarker.core.Environment;
import freemarker.template.SimpleCollection;
import freemarker.template.TemplateDirectiveBody;
import freemarker.template.TemplateException;
import freemarker.template.TemplateModel;
import freemarker.template.TemplateScalarModel;

public class ChannelDirective extends FreemarkerDirectiveSupport{

	@Autowired
	private ChannelService channelService;
	
	public final static String PATH_PARAM = "path";
	public final static String COUNT_PARAM = "count";
	
	@Override
	protected void doExecute(Environment env, Map<String, ?> params,
			TemplateModel[] loopVars, TemplateDirectiveBody body)
			throws TemplateException, IOException {
		//TemplateScalarModel pathModel = (TemplateScalarModel)params.get(PATH_PARAM);
		//String path = pathModel.getAsString();
		//System.out.println(path);
		List<Channel> channels = channelService.queryTop();
		loopVars[0] = new SimpleCollection(channels);
		if(null!=body){
			body.render(env.getOut());
		}
	}
	
	@Override
	protected boolean beforeExecute(Environment env, Map<String, ?> params,
			TemplateModel[] loopVars) {
		if(params.containsKey(PATH_PARAM)){
			return true;
		}
		return false;
	}
}
