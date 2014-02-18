package com.love.morec.application.freemarker.directive;

import java.io.IOException;
import java.util.Map;

import org.apache.commons.lang.StringUtils;

import freemarker.core.Environment;
import freemarker.ext.beans.BeansWrapper;
import freemarker.template.TemplateDirectiveBody;
import freemarker.template.TemplateDirectiveModel;
import freemarker.template.TemplateException;
import freemarker.template.TemplateModel;
import freemarker.template.TemplateModelException;
import freemarker.template.TemplateScalarModel;

public abstract class FreemarkerDirectiveSupport implements TemplateDirectiveModel {
	
	protected BeansWrapper beansWrapper = new BeansWrapper();

	@SuppressWarnings({ "rawtypes", "unchecked" })
	public final void execute(Environment env, Map params, TemplateModel[] loopVars, TemplateDirectiveBody body) throws TemplateException,
			IOException {
		if (beforeExecute(env, params, loopVars)) {
			doExecute(env, params, loopVars, body);
		}
	}

	protected boolean beforeExecute(Environment env, Map<String, ?> params, TemplateModel[] loopVars) {
		return true;
	}

	protected boolean isNotBlankScalarModel(TemplateScalarModel scalarModel) throws TemplateModelException {
		return null != scalarModel && StringUtils.isNotBlank(scalarModel.getAsString());
	}

	protected abstract void doExecute(Environment env, Map<String, ?> params, TemplateModel[] loopVars, TemplateDirectiveBody body)
			throws TemplateException, IOException;

}
