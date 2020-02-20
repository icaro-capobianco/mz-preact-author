<?php

namespace MZ\WP\Plugin\Challenge2020;

const VERSION = '1.0';
const PREFIX  = 'mzpa';

function path() {
	return \plugin_dir_path( __FILE__ );
}
function url() {
	return \plugin_dir_url( __FILE__ );
}
function script_url( $name ) {
	return url() . 'assets/js/' . $name . '.js';
}
function style_url( $name ) {
	return url() . 'assets/css/' . $name . '.css';
}
function enqueue_script( $name, $deps = [], $in_footer = true ) {
	$src    = script_url( $name );
	$handle = PREFIX . $name;
	$ver    = VERSION;
	\wp_enqueue_script( $handle, $src, $deps, $ver, $in_footer );
}
function enqueue_style( $name, $deps = [] ) {
	$src    = style_url( $name );
	$handle = PREFIX . $name;
	$ver    = VERSION;
	\wp_enqueue_style( $handle, $src, $deps, $ver );
}

function install() {
	add_action( 'wp_enqueue_scripts', 'enqueue_assets' );
	add_filter( 'the_content', 'insert_author_box' );
}

function enqueue_assets() {
	enqueue_script( 'main' );
	enqueue_style( 'style' );
}

function insert_author_box( $content ) {
	if ( \is_singular() ) {
		$content .= '<div id="preact-author" ></div>';
	}
	return $content;
}
