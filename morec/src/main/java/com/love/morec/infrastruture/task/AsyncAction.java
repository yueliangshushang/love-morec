package com.love.morec.infrastruture.task;

/**
 * 
 * @author loudyn
 * 
 */
public interface AsyncAction {

	/**
	 * 
	 * @throws Exception
	 */
	public void execute() throws Exception;

	/**
	 * 
	 * @param e
	 */
	public void caughtException(Exception e);

}
