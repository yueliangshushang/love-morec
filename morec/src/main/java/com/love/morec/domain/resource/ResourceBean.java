package com.love.morec.domain.resource;

import java.io.File;

import com.loveme.core.domain.AbstractDomain;

/**
 * 
 * @author Linxiaosheng
 */
public class ResourceBean extends AbstractDomain {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private String name;
	private String path;

	private long size;
	private long lastModified;

	private boolean editable;
	private boolean readable;
	private boolean directory;
	
	public ResourceBean(){
		// do nothing
	}
	
	public ResourceBean(File file){
		this.setName(file.getName()).setDirectory(file.isDirectory()).setEditable(file.canWrite());
		this.setReadable(file.canRead()).setSize(file.length()).setLastModified(file.lastModified());
	}

	public String getName() {
		return name;
	}

	public ResourceBean setName(String name) {
		this.name = name;
		return this;
	}

	public String getPath() {
		return path;
	}

	public ResourceBean setPath(String path) {
		this.path = path;
		return this;
	}

	public long getSize() {
		return size;
	}

	public ResourceBean setSize(long size) {
		this.size = size;
		return this;
	}

	public long getLastModified() {
		return lastModified;
	}

	public ResourceBean setLastModified(long lastModified) {
		this.lastModified = lastModified;
		return this;
	}

	public boolean isEditable() {
		return editable;
	}

	public ResourceBean setEditable(boolean editable) {
		this.editable = editable;
		return this;
	}

	public boolean isReadable() {
		return readable;
	}

	public ResourceBean setReadable(boolean readable) {
		this.readable = readable;
		return this;
	}

	public boolean isDirectory() {
		return directory;
	}

	public ResourceBean setDirectory(boolean directory) {
		this.directory = directory;
		return this;
	}
}
