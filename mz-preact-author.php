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
	\add_action( 'wp_enqueue_scripts', __NAMESPACE__ . 'enqueue_assets' );
	\add_filter( 'the_content', __NAMESPACE__ . 'insert_author_box' );
	\add_action( 'rest_api_init', __NAMESPACE__ . 'register_author_route' );
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
function register_author_route() {
	$namespace = 'preact-author/v1';
	$endpoint  = '/author/(?P<id>[\d]+)';
	$args = [
		'methods'  => 'GET',
		'callback' => __NAMESPACE__ . 'preact_author_rest_callback',
	];
	register_rest_route( $namespace, $endpoint, $args );
}
function preact_author_rest_callback( $request ) {
	$post_id = $request->getParam( 'id' );
}
