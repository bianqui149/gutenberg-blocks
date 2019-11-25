/**
 * BLOCK: quotes-guterberg
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

//  Import CSS.
import './style.scss';
import './editor.scss';

const { __ } = wp.i18n; // Import __() from wp.i18n
const {
	registerBlockType,
} = wp.blocks;

const {
	RichText,PlainText,
} = wp.editor;

/**
 * Register: aa Gutenberg Block.
 *
 * Registers a new block provided a unique name and an object defining its
 * behavior. Once registered, the block is made editor as an option to any
 * editor interface where blocks are implemented.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType( 'cgb/block-quotes-guterberg', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'Bloque Cita para Notas' ), // Block title.
	icon: 'format-quote', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'common', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		__( 'Cita' ),
		__( 'Cita' ),
		__( 'create-guten-block' ),
	],
	attributes: {
		title: {
			type: 'array',
			source: 'children',
			selector: 'p',
		},
		body: {
			type: 'array',
			source: 'children',
			selector: 'strong',
		},
	},

	/**
	 * The edit function describes the structure of your block in the context of the editor.
	 * This represents what the editor will render when the block is used.
	 *
	 * The "edit" property must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 */
	edit({ attributes, className, setAttributes }) {
		             
		return (
			<div className={className}>
				<div className="">
					<PlainText
						onChange={content => setAttributes({ title: content })}
						value={attributes.title}
						placeholder="Cita"
						className="heading"
					/>
				</div>
				<div className="nelio-testimonial-content">
					<RichText
						onChange={content => setAttributes({ body: content })}
						value={attributes.body}
						placeholder="Firma de la cita"
					/>
				</div>
			</div>		
		);
	},
	save({ attributes }) {
		return (
			<div className="card">
				<blockquote className="blockquote">
					<span className="icon icon--quote"></span>
					<p>
						{attributes.title}
					</p>
					<cite className="blockquote__author">
						<strong>{attributes.body}</strong>
					</cite>
				</blockquote>
			</div>
		);
	},
} );
