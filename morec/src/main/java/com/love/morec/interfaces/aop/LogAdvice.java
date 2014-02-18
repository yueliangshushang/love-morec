package com.love.morec.interfaces.aop;

import java.util.Date;

import org.apache.shiro.SecurityUtils;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.love.morec.domain.log.Log;
import com.love.morec.infrastruture.annotation.Auditable;
import com.love.morec.infrastruture.persist.LogRepository;
/**
 * 
 * @author shuye
 *
 */
@Aspect
@Component
public class LogAdvice {
	@Autowired 
	private LogRepository logRepository;
     @AfterReturning("@annotation(auditable)")
	public void after(JoinPoint joinpoint,Auditable auditable) {
		String user = SecurityUtils.getSubject().getPrincipal().toString();
		Date date = new Date(System.currentTimeMillis());
		Log log = new Log();
		log.setUser(user);
		log.setDate(date);
		log.setContent(auditable.action()+":"+joinpoint.getTarget().getClass().getName()+" method: "+joinpoint.getSignature().getName()+":"+joinpoint.getArgs().toString());
		logRepository.save(log);
	}

}
