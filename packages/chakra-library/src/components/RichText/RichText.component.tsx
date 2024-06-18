import React, { ReactElement, useState } from 'react';
import { DraftEditorCommand, Editor, EditorState, RichUtils } from 'draft-js';

import { WYSIWYG } from './WYSIWYG.component';
import { InlineStyleType, RichTextProps } from './RichText.definition';

import * as Chakra from '@chakra-ui/react';

export const RichTextEditor =
    ({}: RichTextProps): ReactElement<RichTextProps> => {
        const [editorState, setEditorState] = useState<EditorState>(
            EditorState.createEmpty()
        );

        const styleMap = {
            'STRIKETHROUGH': {
              textDecoration: 'line-through',
            },
          };

        const handleKeyCommand = (
            command: DraftEditorCommand,
            editorState: EditorState
        ) => {
            const newState: EditorState | null = RichUtils.handleKeyCommand(
                editorState,
                command
            );

            if (newState) {
                setEditorState(newState);
                return 'handled';
            }

            return 'not-handled';
        };

        const handleInlineStyle = (
            e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
            inlineStyle: InlineStyleType
        ) => {
            e.preventDefault();

            setEditorState(
                RichUtils.toggleInlineStyle(editorState, inlineStyle)
            );
        };

        return (
            <Chakra.Flex
                direction='column'
                gap={8}
                width='100%'
                minHeight={104}
                data-label='rich-text-editor'
            >
                <WYSIWYG handleInlineStyle={handleInlineStyle} />
                <Chakra.Box
                    width='100%'
                    bg='white'
                    height='100%'
                    padding={6}
                    borderRadius={6}
                >
                    <Editor
                        editorState={editorState}
                        onChange={(editorState) => setEditorState(editorState)}
                        handleKeyCommand={handleKeyCommand}
                        customStyleMap={styleMap}
                    />
                </Chakra.Box>
            </Chakra.Flex>
        );
    };
