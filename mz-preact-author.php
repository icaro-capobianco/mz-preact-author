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
	return url() . $name . '.js';
}
function style_url( $name ) {
	return url() . $name . '.css';
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
