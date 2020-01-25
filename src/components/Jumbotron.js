import React, { useState } from 'react';
import SearchBar from 'material-ui-search-bar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

function Jumbotron() {

    return (
        <div id="container">
            <div id="container-text">
                Travel safe with BetterBNB
            </div>
            <MuiThemeProvider muiTheme={getMuiTheme()}>
                <SearchBar
                    onChange={() => console.log("changed")}
                    onRequestSearch={() => console.log("searched")}
                    hintText={"Search a location"}
                    style={{
                        margin: '0 auto',
                        maxWidth: 850,
                        borderRadius: '10px',
                        marginTop: '180px'
                    }}
                />
            </MuiThemeProvider>
        </div>
    )
}

export default Jumbotron;