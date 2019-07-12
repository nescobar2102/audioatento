package org.apache.jsp;

import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.jsp.*;

public final class index_jsp extends org.apache.jasper.runtime.HttpJspBase
    implements org.apache.jasper.runtime.JspSourceDependent {

  private static final JspFactory _jspxFactory = JspFactory.getDefaultFactory();

  private static java.util.List<String> _jspx_dependants;

  private org.glassfish.jsp.api.ResourceInjector _jspx_resourceInjector;

  public java.util.List<String> getDependants() {
    return _jspx_dependants;
  }

  public void _jspService(HttpServletRequest request, HttpServletResponse response)
        throws java.io.IOException, ServletException {

    PageContext pageContext = null;
    HttpSession session = null;
    ServletContext application = null;
    ServletConfig config = null;
    JspWriter out = null;
    Object page = this;
    JspWriter _jspx_out = null;
    PageContext _jspx_page_context = null;

    try {
      response.setContentType("text/html;charset=UTF-8");
      pageContext = _jspxFactory.getPageContext(this, request, response,
      			null, true, 8192, true);
      _jspx_page_context = pageContext;
      application = pageContext.getServletContext();
      config = pageContext.getServletConfig();
      session = pageContext.getSession();
      out = pageContext.getOut();
      _jspx_out = out;
      _jspx_resourceInjector = (org.glassfish.jsp.api.ResourceInjector) application.getAttribute("com.sun.appserv.jsp.resource.injector");

      out.write("\n");
      out.write("\n");
      out.write("\n");
      out.write("<!DOCTYPE html>\n");
      out.write("<html lang = \"en\"> \n");
      out.write("   <head> \n");
      out.write("      <meta charset = \"utf-8\" /> \n");
      out.write("   </head>\n");
      out.write("\t\n");
      out.write("   <body> \n");
      out.write("      <div> \n");
      out.write("         <input type = \"text\" id = \"loginInput\" /> \n");
      out.write("         <button id = \"loginBtn\">Login</button> \n");
      out.write("      </div> \n");
      out.write("\t\t\n");
      out.write("      <div> \n");
      out.write("         <input type = \"text\" id = \"otherUsernameInput\" /> \n");
      out.write("         <button id = \"connectToOtherUsernameBtn\">Establish connection</button> \n");
      out.write("      </div> \n");
      out.write("\t\t\n");
      out.write("      <div> \n");
      out.write("         <input type = \"text\" id = \"msgInput\" /> \n");
      out.write("         <button id = \"sendMsgBtn\">Send text message</button> \n");
      out.write("      </div> \n");
      out.write("      <div> \n");
      out.write("         <input type = \"text\" id = \"showMsg\" /> \n");
      out.write("      </div> \n");
      out.write("        <br>\n");
      out.write("            -------------------------------------------------------------------------\n");
      out.write("            \n");
      out.write("\n");
      out.write("       \n");
      out.write("            <h1>Prueba de uso de Audio</h1>\n");
      out.write("\n");
      out.write("            <div id=\"prueba4\">                \n");
      out.write("                <audio controls autoplay></audio>                \n");
      out.write("                \n");
      out.write("                 <br> <br>\n");
      out.write("                   <p></p>\n");
      out.write("                <input onclick=\"grabar()\" id=\"startaudio\" type=\"button\" value=\"Grabar ahora\" />\n");
      out.write("                <input  id=\"stopaudio\" type=\"button\" value=\"Parar y escuchar\" />\n");
      out.write("                <br><br>\n");
      out.write("                <video controls autoplay></video> \n");
      out.write("                <script src=\"recorder.js\" type=\"text/javascript\"></script>\n");
      out.write("                <script>\n");
      out.write("\n");
      out.write("                    function load() {                      \n");
      out.write("                     // load_socket(); // abriendo conexion con websocket en el archivo main.js\n");
      out.write("                        console.log(\"Iniciando proceso...!\")\n");
      out.write("                        navigator.permissions.query({name: 'microphone'}).then(function (result) {\n");
      out.write("                            if (result.state === 'granted') {\n");
      out.write("                            } else if (result.state === 'prompt') {                                \n");
      out.write("                                console.log('Accediendo al micrófono!');\n");
      out.write("                                \n");
      out.write("                            } else if (result.state === 'denied') {\n");
      out.write("                               console.log('Acceso denegado al microfono!');\n");
      out.write("                            }\n");
      out.write("                            result.onchange = function () {\n");
      out.write("                            };\n");
      out.write("                        });\n");
      out.write("//                      //Validar permisos  para acceder a la cámara  \n");
      out.write("                        navigator.permissions.query({name: 'camera'}).then(function (result) {\n");
      out.write("                            if (result.state === 'granted') {\n");
      out.write("                            } else if (result.state === 'prompt') {\n");
      out.write("                                console.log('Accediendo a la cámara!');                              \n");
      out.write("                            } else if (result.state === 'denied') {\n");
      out.write("                                console.log('Acceso denegado a la cámara!');\n");
      out.write("                            }\n");
      out.write("                            result.onchange = function () {\n");
      out.write("                            };\n");
      out.write("                        });\n");
      out.write("                    }\n");
      out.write("                    window.onload = load;\n");
      out.write("                 // Fin del proceso de audio y grabación //\n");
      out.write("                </script>\t\t\n");
      out.write("      <script src= \"client.js\"></script>\n");
      out.write("   </body>\n");
      out.write("\t\n");
      out.write("</html>");
    } catch (Throwable t) {
      if (!(t instanceof SkipPageException)){
        out = _jspx_out;
        if (out != null && out.getBufferSize() != 0)
          out.clearBuffer();
        if (_jspx_page_context != null) _jspx_page_context.handlePageException(t);
        else throw new ServletException(t);
      }
    } finally {
      _jspxFactory.releasePageContext(_jspx_page_context);
    }
  }
}
